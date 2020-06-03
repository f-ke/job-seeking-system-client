import React,{Component} from "react"
import {connect}from "react-redux";
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
import{sendMsg,readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item

class Chat extends Component {
    state={
        content:"",
        isShow:false // emoj list
    }
    componentWillMount() {
        const emojis = ['😀','😃', '😄', '😆','😀','😃', '😄', '😆','😀','😃', '😄', '😆']
        this.emojis = emojis.map(emoji=>({text:emoji}))
    }//before fist render, initial emojis
   componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight)//每次初始化到消息底部


   }
   componentDidUpdate() {
       window.scrollTo(0,document.body.scrollHeight)//发消息更新到底部
   }
componentWillUnmount() {//退出前更新
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from,to)//update msg number

}

    handleSend =()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //send requirement
        if(content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:"",isShow:false})
    }
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) { // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0) }
    }

    render() {
      const {user} = this.props
        const{chartMsgs,users} = this.props.chat;
        const meid = user._id
        if(!users[meid]){
            return null //if we do not get users , return nothing
        }
        const targetid = this.props.match.params.userid
        const chatid = [meid,targetid].sort().join('_')

        //filter
        const msgs = chartMsgs.filter(msg=>msg.chat_id === chatid)
          //get header

        const targetHeader = users[targetid].header//null array so we should wait
        //
        const targeticon = targetHeader?require(`../../asserts/images/${targetHeader}.png`):null

        return(
            <div id='chat-page'>
                <NavBar icon={<Icon type='left'/>}
                        onLeftClick={()=>this.props.history.goBack()}
                        className ='sticky-header'>
                    {users[targetid].username
                    }</NavBar>
                <List style={{marginTop:50, marginBottom:50}}>
                    <QueueAnim  type='left' delay={100}>
                    {msgs.map(msg =>{
                        if(meid === msg.to){
                            return (
                                <Item key = {msg._id} thumb={targeticon} > {msg.content} </Item>

                            )
                        }else{
                            return ( <Item key = {msg._id} className='chat-me' extra='me' > {msg.content} </Item>)
                        }

                    })}
                    </QueueAnim>

                 </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="please input" value = {this.state.content} onChange={val=>this.setState({content:val})}
                               onFocus = {()=>this.setState({isShow:false})}
                               extra={<span>
                                   <span onClick ={this.toggleShow} style={{marginRight:5}}>😀</span>
                                   <span onClick={this.handleSend}>send</span>
                               </span>
                               } />

                    { this.state.isShow ? ( <Grid data={this.emojis} columnNum={8} carouselMaxRow={4}
                                                  isCarousel={true}
                                                  onClick={(item) => {
                                                      this.setState({content: this.state.content + item.text}) }}
                    /> ) : null }
                </div>
            </div>
        )
    }

}
export default connect(
   state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)
