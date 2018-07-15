import React from 'react'
class Pic extends React.Component {
    constructor() {
        super()
        this.state = {
            rotate:[],
            rotateY:[],
            top:[],
            left:[],
            zIndex:[],
            index:-1
        }
    }
    componentDidMount(i) {
        this.random(i)

    }
    random(needI) {
        let newRotate = [], newTop = [], newLeft = [], newzIndex =[], newRotateY = []
        this.props.picJson.picUrl.forEach((v,i) => {
            newRotateY.push('0')
            if(i === needI){
                newRotate.push('0')
                newLeft.push('calc(50% - 170px)')
                newTop.push('20%')
                newzIndex.push(99)
            }else {
                newRotate.push(Math.random()*-720+360)
                newLeft.push(Math.random()*window.innerWidth-170)
                newTop.push(Math.random()*window.innerHeight-200)
                newzIndex.push(10)
            }

            this.setState({
                rotate:newRotate,
                top:newTop,
                left:newLeft,
                zIndex:newzIndex,
                rotateY:newRotateY,
                                                                                                                                          })
        })
    }
    handleClick = (i,e) => {
        if(e.target.classList.contains('active')){
            if(e.target.classList.contains('bActive')){
                e.target.classList.remove('bActive')
                this.state.rotateY.splice(i,1,0)
            }else {
                e.target.classList.add('bActive')
                //this.refs.myUl.children[i].classList.add('active')
                this.state.rotateY.splice(i,1,180)
            }
            this.setState({
                rotateY:this.state.rotateY
            })
        }else {
            this.random(i)
            console.log()
            this.setState({
                index:i
            })
        }

    }
    render(){
        let aLi = [],bAli = []
        this.props.picJson.picUrl.forEach((v,i) => {
            aLi.push(<li style={{transform:'perspective(800px) rotateY('+this.state.rotateY[i]+'deg) rotate('+this.state.rotate[i]+'deg)',left:this.state.left[i],top:this.state.top[i],zIndex:this.state.zIndex[i], transition:Math.random()*0.4+0.3+'s'}} key = {i}>
                <div className="zm"><img src={v} alt=""/><div className="textNode">{this.props.picJson.text[i]}</div></div>
                <div className="fm">{this.props.picJson.bText[i]}</div>
            </li>)
            bAli.push(<li key = {i} className={i == this.state.index?'active':''} onClick = {this.handleClick.bind(this,i)}></li>)
        })
        return (
            <div>
                <ul className="myUl" ref = 'myUl'>
                    {aLi}
                </ul>
                <ol className="myOl">
                    {bAli}
                </ol>

            </div>)
    }
}
export default Pic


