import React from 'react';
import { render } from 'react-dom';
// import FaceDetect from './face-dettect';
// import VideoWrapper from './video-wrapper';
import 'tracking/build/tracking';
import 'tracking/build/data/face';
import 'tracking/build/data/mouth';
import 'tracking/build/data/eye';


const App = () => (
  <div>  {/*
    <VideoWrapper/>
   <h2>Picture face detection</h2>
    <FaceDetect/>*/}
  </div>
);

render(<App />, document.getElementById('root'));
