//转译  时间

let hostName = window.location.host;
let host = '';
if (hostName == 'www.labifenqi.com'){
  host = 'https://xuedai.labifenqi.com/'
}
else if(hostName == 'boxtest.labifenqi.com') {
  host = 'https://boxtest.labifenqi.com/'
} else {
  host = 'https://box.labifenqi.com/'
}



let BMISAPIEDIT   = 'bmisapi/website/edit/',
    ULOGINNC      ='uloginnc/',
    ULOGINNCCLC   ='uloginnc/clc/',
    ULOGINNCLBC   ='uloginnc/lbc/',
    TTBAPIBUSER   ='ttbapi/buser/',
    backorderv1   ='bmisapi/backend/order/v1/',
    OPERATEREPORT = 'bmisapi/operateReport',
    CONTRACT      = 'bmisapi/contract',
    TRADERSTAFF   ='bmisapi/trader/staff/',
    BMISAPITRADER ='bmisapi/trader/',
    BMISAPIPRELOAN='bmisapi/preLoan/',
    BMISAPI       ='bmisapi/',
    SYSTEMSERVE   ='bmisapi/system/serve/'

module.exports = {
  host,
  BMISAPIEDIT,
  ULOGINNC,
  ULOGINNCCLC,
  ULOGINNCLBC,
  TTBAPIBUSER,
  backorderv1,
  OPERATEREPORT,
  CONTRACT,
  TRADERSTAFF,
  BMISAPITRADER,
  BMISAPIPRELOAN,
  BMISAPI,
  SYSTEMSERVE
};
