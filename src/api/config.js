import axios from 'axios'
import { MessageBox,Message } from 'element-ui';
// import lb_utils from '@/api/lb_utils';
import {host} from './baseUrl';
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//配置接口地址
axios.defaults.baseURL = host;

//请求拦截
axios.interceptors.request.use((config)=>{
  // lb_utils.setReHeader(config)
  return config
})

axios.interceptors.response.use((response) => {
  if (response.data.code === -405) {
    // MessageBox.alert('账号未登录，请重新登录',response.data.message,{
    //   confirmButtonText: '确定',
    //   callback: action => {
    //     localStorage.clear();
    //     location.href = window.location.origin + '/h5-hzbmis/login';
    //   }
    // });
  } else if(response.data.code == -200 || response.data.code == -201){
    
  }
  else if(response.data.code !== 1){
    Message.error(response.data.message);
  }
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

