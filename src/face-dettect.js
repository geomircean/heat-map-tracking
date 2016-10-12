import React, { Component } from 'react';

const sourceImg = '/static/media/group_03.jpg';

class FaceDetect extends Component {
  static displayName = 'FaceDetect';

  constructor(props) {
    super(props);
    this.tracking = window.tracking;
  }

  plot(x, y, w, h) {
    const img = document.getElementById('img');
    const rect = document.createElement('div');

    document.querySelector('.demo-container').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
  }

  componentWillMount() {
    this.img = new Image();
    this.img.src = sourceImg;
  }

  componentDidMount() {
    let tracker = new this.tracking.ObjectTracker('face');
    tracker.setStepSize(1.7);

    this.img.onload = () => {
      this.tracking.track(this.img, tracker);

      tracker.on('track', (event) => {
        console.log(event);
        event.data.forEach((rect) => {
          this.plot(rect.x, rect.y, rect.width, rect.height);
        });
      });
    };
  }

  render () {
    return (
      <div className='demo-frame'>
        <div className='demo-container'>
          <img id='img' src={sourceImg}/>
        </div>
      </div>
    );
  }
}

export default FaceDetect;