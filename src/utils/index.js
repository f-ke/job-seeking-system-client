
//包含多个工具函数的模块
//返回对应的路由路劲
//employee to /employeeinfo
//boss to /bossinfo
//判断用户已经完善信息？user.header 是否有值
//判断类型，type
export function getRedirectTo(type, header){
    let path =''
    //type
    if(type === 'boss'){
        path ='/boss'
    }else{
        path = '/employee'
    }
    if(!header){ //没有值才完善
        path += 'info'
    }
    return path;

}
