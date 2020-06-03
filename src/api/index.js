//interface export,return promise

//register
import ajax from './ajax'
export const reqRegister = (user) =>ajax('https://job-seeking-server.herokuapp.com/register',user,'Post')

export const reqLogin = ({username, password}) => ajax('/login',{username, password},'Post')

//update
export const reqUpdateUser = (user) =>ajax('/update',user,'Post')


export const reqUser =()=> ajax('/user')
export const reqUserlist = (type)=>ajax('/userlist',{type})
export const reqChatMsgLIST =()=>ajax('/msglist')
export const reqReadMst =(from) =>ajax('/readmsg',{from},'Post')
