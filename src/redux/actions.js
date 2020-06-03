import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserlist,reqChatMsgLIST,reqReadMst} from "../api";
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    RECEIVE_USELIST,
    RECEIVE_USER,
    RESET_USER,
     MSG_READ

} from './actions-types'
import io from 'socket.io-client'
/*单例对象
* 1.创建对象之前：判断是否已经创建，只有不存在时才创建
* 2.之后：保存对象*/
function initIo(dispatch, userid){
    if(!io.socket){
        io.socket = io('ws://job-seeking-server.herokuapp.com/')
        //only related messages

        io.socket.on('receiveMsg',function(chartMsg){
            console.log('receive message from server',chartMsg)
            if(userid == chartMsg.from || userid == chartMsg.to){
                dispatch(receiveMsg({chartMsg,userid}))
            }
        })
    }


}
export const sendMsg = ({from,to,content})=>{
    return dispatch =>{
        console.log('send message', {from, to ,content})

        //send msg
        io.socket.emit('sendMsg',{from,to,content})
    }
}
export const readMsg =(from, to )=>{
    return async dispatch =>{
        const response = await reqReadMst(from)
        const  result = response.data
        if(result.code === 0){
            const count = result.data
            dispatch(msgRead({count,from, to} ))
        }
    }

}
async function getMsglist(dispatch,userid){
    initIo(dispatch,userid)
    const response = await reqChatMsgLIST()
    const result = response.data
    if(result.code === 0){
        const {users,chartMsgs} = result.data
        dispatch(receiveMsgList({users,chartMsgs,userid}))

    }
}//login, register, getuser require this util function
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});//授权成功的同步action
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg});//错误失败提示信息的同步anction
const receiveUser =(user)=>({type:RECEIVE_USER,data:user});
export const resetUser =(msg)=>({type:RESET_USER,data:msg});
export const receiveUserlist = (userList)=>({type:RECEIVE_USELIST,data:userList})
export const receiveMsgList = ({users,chartMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chartMsgs,userid}})
const receiveMsg =({chartMsg,userid})=>({type:RECEIVE_MSG,data:{chartMsg,userid}})
const msgRead = ({count, from,to})=>({type:MSG_READ,data:{count, from, to}})
export const register =(user)=>{
    const {username, password, password2,type} = user;
    if(!username){
        return errorMsg('username cound not be null')
    }
    else if(password !== password2){
        //form front end check
        return errorMsg('password should be the same')
    }
    //form data is validate ,then send ajax
    return  async dispath =>{

        //send ajax async request for register
       // const promise = reqRegister(user)
       //  promise.then(response =>{
       //      const result = response.data
       //  })

        const response = await reqRegister({username, password, type})//wait for response
        const result = response.data
        if(result.code === 0){
            //sucees diapatch successanction
            getMsglist(dispath,result.data._id)
            dispath(authSuccess(result.data))
        }else{
            //faild
            dispath(errorMsg(result.msg))
        }
    }
}
//login
export const login =(user)=>{
    const {username, password} = user
    if(!username){
        return errorMsg('username cound not be null')
    }
    else if(!password){
        //form front end check
        return errorMsg('password should not null')
    }
    return  async dispath =>{
        //send ajax async request for register
        // const promise = reqRegister(user)
        //  promise.then(response =>{
        //      const result = response.data
        //  })

        const response = await reqLogin(user)//wait for response
        const result = response.data
        if(result.code === 0){
            getMsglist(dispath,result.data._id)
            //sucees
            dispath(authSuccess(result.data))
        }else{
            //faild
            dispath(errorMsg(result.msg))
        }
    }
}
//update
export const updateuser=(user)=>{
    return async dispatch =>{
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
            //success
        }else{//failed :msg
            dispatch(resetUser(result.msg))

        }

    }
}
export const getUser =()=>{
    return async dispatch =>{
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            getMsglist(dispatch,result.data._id)
            //sucess
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
export const getUserList =(type)=>{
    return async dispatch =>{
        const response = await reqUserlist(type)
        const result = response.data
        if(result.code ===0){
        dispatch(receiveUserlist(result.data))}
    }
}

