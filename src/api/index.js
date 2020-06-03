//interface export,return promise

//register
import ajax from './ajax'
export const reqRegister = (user) =>ajax('https://job-seeking-server.herokuapp.com/register',user,'Post')

export const reqLogin = ({username, password}) => ajax('https://job-seeking-server.herokuapp.com/login',{username, password},'Post')

//update
export const reqUpdateUser = (user) =>ajax('https://job-seeking-server.herokuapp.com/update',user,'Post')


export const reqUser =()=> ajax('/user')
export const reqUserlist = (type)=>ajax('/userlist',{type})
export const reqChatMsgLIST =()=>ajax('https://job-seeking-server.herokuapp.com/msglist')
export const reqReadMst =(from) =>ajax('/readmsg',{from},'Post')
