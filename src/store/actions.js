
/**
 * 页面总数据
 */
export const setPageArr = ({commit},obj) => {
  commit({
    type: 'setPageArr', 
    obj
  });
};

/**
 * 当前选中项
 */
export const setCurrentObj = ({commit},obj) => {
  commit({
    type: 'setCurrentObj', 
    obj
  });
};

/**
 * mid
 */
export const setMidObj = ({commit},obj) => {
  commit({
    type: 'setMidObj', 
    obj
  });
};

/**
 * 话术组
 */
export const setGroupArr = ({commit},arr) => {
  commit({
    type: 'setGroupArr', 
    arr
  });
};


