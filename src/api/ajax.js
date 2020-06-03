//send request by ajax
//return promise duixiang
import axios from 'axios'
export default function ajax(url, data={}, type='Get'){
    if(type === 'Get'){
        //{username:tom, password:123}
        //username=tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(key =>{
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr){
            paramStr.substr(0,paramStr.length - 1)
        }
    return axios.get(url + '?' + paramStr)
    }
    else{
        return axios.post(url,data)
    }
}
