import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
class Message extends Component {
//对msg 分组并且以lastmsg 排在最前面的数组
//1.{chat_id,lastmessage}
    //2.get all class container array
    //3.group by create_time
 getLastMsgs =(chartMsgs,userid)=>{
     const lastMsgObjs = {}
     chartMsgs.forEach(msg => {
         //count msg
         if(msg.to === userid && !msg.read){
         msg.unReadCount=1
         }else{
             msg.unReadCount=0;
         }
         const chatid = msg.chat_id
         let lastMsg = lastMsgObjs[chatid]
         //acuire saved msg in current group
         //if has saved
         if(!lastMsg){
             //save
             lastMsgObjs[chatid] = msg
         }else{
             //save saved unreadmsg
             const unReadcount = lastMsg.unReadCount
            // if msg is later than lastmsg, msg = lastmasg
             if(msg.create_time > lastMsg.create_time){
                 lastMsgObjs[chatid] = msg
             }
             lastMsgObjs[chatid].unReadCount=unReadcount+msg.unReadCount//save total
         }

         })

        const lastmsgs =  Object.values(lastMsgObjs)
        lastmsgs.sort(function(m1,m2){
            return m2.create_time - m1.create_time
        })
     return lastmsgs
}
    render() {
        const{user} = this.props
        const{chartMsgs, users}= this.props.chat
        //chartMsg group by chat_id
        const lastMsgs = this.getLastMsgs(chartMsgs,user._id)


        return (
            <List style={{marginTop:50, marginBottom:50}}>
                {
                    lastMsgs.map(msg=>{
                        const targetuser = msg.to === user._id ? users[msg.from]:users[msg.to]
                        const userheader = targetuser.header
                        const targetuserid =  msg.to === user._id ?msg.from:msg.to
                        return( <Item
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={ userheader?require(`../../asserts/images/${userheader}.png`):null} arrow='horizontal'
                        onClick={()=>this.props.history.push(`/chat/${targetuserid}`)}>{msg.content}
                            <Brief>{targetuser.username}</Brief>
                        </Item>)
                    })
                }
            </List> )
    } }
 export default  connect(
     state=>({user:state.user, chat:state.chat}),
     {}

)(Message)
