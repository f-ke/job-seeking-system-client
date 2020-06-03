//interface export,return promise

//register
import ajax from './ajax'
export const reqRegister = (user) =>ajax('https://job-seeking-server.herokuapp.com/register',user,'Post')

export const reqLogin = ({username, password}) => ajax('https://job-seeking-server.herokuapp.com/login',{username, password},'Post')

//update
export const reqUpdateUser = (user) =>ajax('https://job-seeking-server.herokuapp.com/update',user,'Post')


export const reqUser =()=> ajax('https://job-seeking-server.herokuapp.com/user')
export const reqUserlist = (type)=>ajax('https://job-seeking-server.herokuapp.com/userlist',{type})
export const reqChatMsgLIST =()=>ajax('https://job-seeking-server.herokuapp.com/msglist')
export const reqReadMst =(from) =>ajax('https://job-seeking-server.herokuapp.com/readmsg',{from},'Post')
