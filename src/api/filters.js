function date(v){
  var time=new Date(v);
  return time.getFullYear()+"/"+changNum((time.getMonth()+1))+"/"
    +changNum(time.getDate())
    +" "+changNum(time.getHours())
    +":"+changNum(time.getMinutes())
    +":"+changNum(time.getSeconds());
};
function day(v){
  var time=new Date(v);
  return changNum((time.getMonth()+1))+"月"
    +changNum(time.getDate()) +"日";
};
function week(v){
  var time=new Date(v);
  var a = ["日", "一", "二", "三", "四", "五", "六"];
  return time.getFullYear()+"年"+changNum((time.getMonth()+1))+"月"
    +changNum(time.getDate())
    +"日(星期"+a[time.getDay()]+")";
};
function changNum(num){
  if(num<10){
    return "0"+num;
  }else{
    return num;
  }

};
function times(v) {
  if(v!=null){
    var time=v;
    return time.substring(0, time.lastIndexOf('.'));
  }
};
function num(v) {
  if (v) {
    return v.toFixed(0);
  }
}
function seed(v) {
  switch(v) {
    case 1:
      return "种子用户";
    default:
      return "非种子用户";
  }
}
function orderType(v) {
  switch(v) {
    case '1':
      return "本金";
    case '2':
      return "服务费";
    default:
      return "";
  }
}
function write(v) {
  switch(v) {
    case '1':
      return "是";
    case '0':
      return "否";
    default:
      return "";
  }
}
function baseInfo(v){
  if(v){
    return v;
  }else{
    return '-----'
  }
}
export default {
  date,
  times,
  week,
  day,
  num,
  seed,
  orderType,
  write
}
