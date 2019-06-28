let midObj = localStorage.getItem('lb-tuitui-mid-obj'),
    groupArr = localStorage.getItem('lb-tuitui-word-group-arr');
const state = {
  pageArr : [],
  currentObj : {},
  visitedViews :[],
  cachedViews:[],
  midObj : midObj ? JSON.parse(midObj) :{},
  groupArr :  groupArr ? JSON.parse(groupArr) :[]
}
export default state;