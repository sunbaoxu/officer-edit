import pageObj from '$js/pageObj';
import menuObj from '$js/menuObj';

//重新对currentObj赋值
function currentObjFn (state,ind) {
  let mObj = JSON.parse(JSON.stringify(menuObj)),
      currentObj     = mObj[state.pageArr[ind].type];
      currentObj.id    = state.pageArr[ind].id;
      state.currentObj = currentObj;
}

/**
 * 设置页面总数据
 * @param {Object} state 
 * @param {Object} payload 
 * @param {Object} payload.obj   
 * @param {Object} payload.obj.obj   
 * @param {String} payload.obj.type   remove:删除  add：添加  默认add
 */
export const setPageArr = (state, payload) => {
  if(payload.obj.type == 'init'){
    state.pageArr = payload.obj.arr;
    currentObjFn(state,0);
  }

  //点击
  else if(payload.obj.type == 'click'){
    let ind  = payload.obj.ind;
        
    //当前
    if(payload.obj.position=='now'){
      currentObjFn(state,ind);
    }
    //删除
    else if(payload.obj.position == 'remove'){
      if(state.pageArr.length ==1){
        state.currentObj = {}
      } else if(state.pageArr.length-1 ==ind) {
        currentObjFn(state,ind-1)
      } else {
        currentObjFn(state,ind+1) 
      }

      state.pageArr.splice(ind,1);
    } 
    //向上
    else if(payload.obj.position == 'up'){
      let obj = state.pageArr[ind],
          obj1=state.pageArr[ind-1];
          currentObjFn(state,ind);
          state.pageArr.splice(ind-1,2,obj,obj1);

    } 
    //向下
    else if(payload.obj.position == 'down'){
      let obj = state.pageArr[ind],
          obj1=state.pageArr[ind+1];
          currentObjFn(state,ind);
          state.pageArr.splice(ind,2,obj1,obj);
    }
  }
  else{
    //修改
    if(payload.obj.id){
      let arr = state.pageArr;
      arr.map((m,i)=>{
        if(m.id == payload.obj.id){
          state.pageArr[i] = payload.obj.obj;
        }
      });
    } 
    //添加
    else{
      let obj = JSON.parse(JSON.stringify(pageObj[payload.obj.obj.type]));
          obj.id = state.pageArr.length+1;
          payload.obj.obj.id = obj.id;

          state.pageArr.push(obj);
          state.currentObj = {};
          state.currentObj = payload.obj.obj;
    }
  }
}

/**
 * 当前选中项
 * @param {Object} state 
 * @param {Object} payload 
 * @param {Object} payload.obj
 */
// mid
export const setMidObj = (state, payload) => {
  localStorage.setItem('lb-tuitui-mid-obj',JSON.stringify(payload.obj))
  state.midObj = payload.obj
}
/**
 * 话术组 arr
 */
export const setGroupArr = (state, payload) => {
  localStorage.setItem('lb-tuitui-word-group-arr',JSON.stringify(payload.arr))
  state.groupArr = payload.arr
}
