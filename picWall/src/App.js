import React, { Component } from 'react';
import './App.css';
import Pic from './pic/pic'


class App extends Component {
    css() {
        return`
    *{margin:0;padding:0;list-style:none;}
    body{background:black;overflow:hidden;}
    .myUl>li{width:340px;height:416px;background:white;position:absolute;box-shadow:0 0 15px black;
    transform-style:preserve-3d;}
    .myUl>li> .zm {width:100%;height:100%;position:absolute;left:0;top;0;transform:translateZ(1px);}
    .myUl>li> .zm>img{width:285px;height:192px;position:absolute;left:50%;transform:translateX(-50%);top:93px;}
    .myUl>li> .zm> .textNode{width:100%;position:absolute;text-align:center;bottom:24px;color:#4d544d;}
    .myUl>li> .fm {width:100%;height:100%;position:absolute;left:0;top;0;transform:translate(-1px) rotateY(180deg);text-align:center;}
    
    .myOl{position:absolute;left:50%;transform:translateX(-50%);bottom:38px;z-index:100;}
    .myOl li{width:14px;height:14px;float:left;background:#007d77;margin:8px;border-radius:50%;cursor:pointer;transition:0.7s;}
    .myOl li.active{transform:scale(1.5) rotateY(180deg);}
    .myOl li.bActive{transform:scale(1.5) rotateY(360deg);background:yellow;}
    
    `
    }
    render() {

        return (
            <div className="App">
                <style dangerouslySetInnerHTML={{__html:this.css()}}></style>
                <Pic picJson = {{
                    picUrl:['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg','./img/5.jpg','./img/6.jpg','./img/7.jpg','./img/8.jpg'],
                    text:['照片1','照片2','照片3','照片4','照片5','照片6','照片7','照片8'],
                    bText:['我是详细介绍1','我是详细介绍2','我是详细介绍3','我是详细介绍4','我是详细介绍5','我是详细介绍6','我是详细介绍7','我是详细介绍8']
                }}/>
            </div>
        );
    }
}

export default App;
