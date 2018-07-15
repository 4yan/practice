import React, {Component} from 'react'

class SlidePic extends Component {
    constructor(){
        super()
        this.state = {
            index: 0,
            setTimer: null
        }
    }

    componentDidMount(){
        this.autoPlay()
    }

    autoPlay = () =>{
        clearInterval(this.state.setTimer)
        this.state.setTimer = setInterval(() =>{
            this.setState({
                index: this.state.index +1 == this.props.slidePicJson.picUrl.length?0:this.state.index +1
            })
        },this.props.slidePicJson.timer)
    }

    handleClick = (i) =>{
        this.setState({
            index: i
        })
    }
    leftClick = () =>{
        this.setState({
            index: this.state.index -1 == -1?this.props.slidePicJson.picUrl.length-1:this.state.index -1
        })
    }
    rightClick = () =>{
        this.setState({
            index: this.state.index +1 == this.props.slidePicJson.picUrl.length?0:this.state.index +1
        })
    }

    handleMouseOver = () =>{
        clearInterval(this.state.setTimer)
    }

    render(){
        let aLi = [], aLio = []

        this.props.slidePicJson.picUrl.forEach((v,i) => {
            aLi.push(<li key = {i}><img src={v} alt=""/></li>)
            aLio.push(<li key = {i} className={this.state.index == i? 'active':''} onClick={this.handleClick.bind(this,i)}></li>)
        })
        return (
            <div className='container' onMouseOver={this.handleMouseOver} onMouseLeave={this.autoPlay}>
                <div className='left' onClick={this.leftClick}></div>
                <ul style={{width: this.props.slidePicJson.picUrl.length*450, left: this.state.index*-450}}>{aLi}</ul>
                <div className='right' onClick={this.rightClick}></div>
                <ol>{aLio}</ol>
            </div>
        )
    }
}

export default SlidePic
