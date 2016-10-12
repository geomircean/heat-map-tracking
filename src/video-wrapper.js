import React, { Component } from 'react';
const dat = require('dat-gui');
const sourceVideo = '/static/media/video_01.mp4';

class VideoWrapper extends Component {
  static displayName = 'VideoWrapper';

  constructor(props) {
    super(props);
    this.tracking = window.tracking;
  }

  colorRegister(r, g, b) {
    var dx = r - 120;
    var dy = g - 60;
    var dz = b - 210;
    if ((b - g) >= 100 && (r - g) >= 60) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 3500;
  }

  handleFoundColor(rect, context)  {
    if (rect.color === 'custom') {
      rect.color = tracker.customColor;
    }
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    const context = canvas.getContext('2d');
    this.tracking.ColorTracker.registerColor('magenta', this.colorRegister);
    const tracker = new tracking.ColorTracker(['cyan', 'magenta', 'yellow']);
    tracker.setMinDimension(5);
    this.tracking.track('#video', tracker);
         tracker.on('track', (event) => {
           if(event.data.length > 0) { console.log(event); }
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach((rect) => {
          this.handleFoundColor(rect, context);
        });
      });
    // console.log(dat);
    //initGUIControllers(tracker);
  }

  render () {
    return (
      <div className='demo-frame'>
        <div className='demo-container'>
          <div id='rectangle'></div>
          <video id='video' width='800' height='530' preload autoplay loop muted controls>
            <source src={sourceVideo} type="video/mp4"/>
          </video>
          <canvas id='canvas' width='800' height='500'></canvas>
        </div>
      </div>
    );
  }
}

export default VideoWrapper;