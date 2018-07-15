import React, { Component } from 'react';
import './App.css';
import SlidePic from "./slidePic";
class App extends Component {
  render() {
    return (
      <div className="App">
        <SlidePic slidePicJson = {{
            picUrl : ['./image/img1.jpg', './image/img2.jpg', './image/img3.jpg'],
            timer : 2000
        }} />
      </div>
    );
  }
}

export default App;
