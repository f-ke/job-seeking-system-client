import {getRedirectTo} from "../utils";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USELIST, RECEIVE_USER, RESET_USER,
RECEIVE_MSG,
RECEIVE_MSG_LIST,MSG_READ} from "./actions-types";
import {combineReducers} from 'redux'
const initUser ={
    username:'',
    type:'',
    msg:'',//error msg
    reDirectto:''

}


function user(state=initUser, action){
    switch(action.type){
        case AUTH_SUCCESS:
            const{type, header} = action.data
            return { ...action.data, reDirectto:getRedirectTo(type, header) }//解封，覆盖掉原状态
        case ERROR_MSG:
            return {...state, msg: action.data};
        case RECEIVE_USER://DATA USER
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}

        default:
            return state
    }
}
const initUserList = []
function userList(state = initUserList,action){
    switch(action.type){
        case RECEIVE_USELIST:
            return action.data
        default:
            return state

    }

}
const initChat={
    users:{},//all users  propsname: userid, value:{username, header}
    chartMsgs:[],//user related msg array
    unReadCount:0//total unread numbers

}
function chat(state = initChat,action){
    switch(action.type){
        case RECEIVE_MSG:
            const {chartMsg,userid} = action.data
            return{users:state.users,
            chartMsgs: [...state.chartMsgs, chartMsg],
            unReadCount: state.unReadCount + (!chartMsg.read && chartMsg.to === userid?1:0)};

        case RECEIVE_MSG_LIST:
            const {users,chartMsgs} = action.data
            return {users,chartMsgs,
                unReadCount: chartMsgs.reduce((preTotal,msg)=>preTotal + (!msg.read && msg.to===action.data.userid?1:0),0)
            };
        case MSG_READ:
            const{from, to,count} = action.data

            return{
                users:state.users,
                chartMsgs:state.chartMsgs.map(msg=>{
                    if(msg.from === from && msg.to === to &&!msg.read){
                        return{...msg, read:true}
                    }else{
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count

            }

        default:
            return state;
    }

}
export default combineReducers({
    user,userList,chat}
)//向外暴露结构的状态（user:{},userList:[],chat:{})

