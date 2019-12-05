import axios from 'axios'
import {host} from './baseUrl';
axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//配置接口地址
axios.defaults.baseURL = host;

//请求拦截
axios.interceptors.request.use((config)=>{
  return config
})

axios.interceptors.response.use((response) => {
 
  return response
})

export function fetch(url, params,type,config) {
  return new Promise((resolve, reject) => {
    if(type==='post'){
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    } else if(type==='get'){
      axios.get(url,{params})
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    }
    else if(type == 'date'){
      axios.post(url,params,config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
    }
    else{
      resolve(axios.defaults.baseURL + url);
    }
  })
}

