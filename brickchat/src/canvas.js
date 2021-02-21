 // canvas.js
 // the canvas class was copied from the following introductory tutorial
 // and then modified slightly for our use: https://pusher.com/tutorials/live-paint-react

    import React, { Component } from 'react';
    import { v4 } from 'uuid';
	import Pusher from 'pusher-js';


class Canvas extends Component {
  constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
		    this.pusher = new Pusher('9db5aa5f56be39d0fdde', {
          cluster: 'us2',
        });

        this.isPainting = false;
        // Different stroke styles to be used for user and guest
        this.userStrokeStyle = '#ffffff';
        this.guestStrokeStyle = '#ffa500';
        this.line = [];
        // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
        this.userId = `${v4()}-${props.chatname}`;
        this.prevPos = { offsetX: 0, offsetY: 0 };
      }



      onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
      }

      onMouseMove({ nativeEvent }) {
        if (this.isPainting) {
          const { offsetX, offsetY } = nativeEvent;
          const offSetData = { offsetX, offsetY };
          // Set the start and stop position of the paint event.
          const positionData = {
            start: { ...this.prevPos },
            stop: { ...offSetData },
          };
          // Add the position to the line array
          this.line = this.line.concat(positionData);
          this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
      }
      endPaintEvent() {
        if (this.isPainting) {
          this.isPainting = false;

          this.sendPaintData();
        }
      }
      paint(prevPos, currPos, strokeStyle) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
      }

      async sendPaintData() {
        const body = {
          line: this.line,
          userId: this.userId,
        };
        // We use the native fetch API to make requests to the server
        const req = await fetch('http://localhost:4000/paint', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        });
        const res = await req.json();
        this.line = [];
      }

      clear()
      {
        this.ctx.fillColor = '#000000';
        this.ctx.fillRect(0, 0, 10000, 10000);
      }

      componentDidMount() {
        // Here we set up the properties of the canvas element.
        this.canvas.width = 1000;
        this.canvas.height = 800;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;

		const channel = this.pusher.subscribe('painting');
        channel.bind('draw', (data) => {

          const { userId, line } = data;

          if (userId !== this.userId)
          {
            let id = userId.substr(userId.lastIndexOf('-') + 1);
            if(id === this.props.chatname)
            {
              line.forEach((position) => {
                this.paint(position.start, position.stop, this.guestStrokeStyle);
              });
            }
          }
        });
      }

      render() {
        return (
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <button style={{border: 'none', backgroundColor: '#F76902', marginRight: 10, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, height: 48}} onClick={() =>
                {
                  this.clear();
                }}>Clear</button>
            <canvas
            // We use the ref attribute to get direct access to the canvas element.
              ref={(ref) => (this.canvas = ref)}
              style={{ background: 'black' }}
              onMouseDown={this.onMouseDown}
              onMouseLeave={this.endPaintEvent}
              onMouseUp={this.endPaintEvent}
              onMouseMove={this.onMouseMove}
            />
          </div>
        );
      }
    }
    export default Canvas;
