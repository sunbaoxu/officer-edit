export default {
  '10001' : {
    'mainTitle' : '标题栏' ,
    'logoUrl' : 'static/img/title/dian.png',
    'logoCosid' :0,
    'type' : '10001'
  },
  '10002' : {
    'mainTitle' : '主标题' ,
    'mainTitleAsync' :true,
    'subheading' : '副标题' ,
    'subheadingAsync':true,
    'content' : '' ,
    'align' : '1',
    'type' : '10002'
  },
  '10003' : {
    'imgType' : '1' ,
    'type' : '10003',
    maxRowNum :2,
    maxColumnNum :2 ,
    imgArr : []
  },
  '10004' : {
    'imgType' : '1' ,
    'type' : '10004',
    imgArr : ['','']
  },
  '10005' : {
    'imgType' : '1' ,
    'type' : '10005',
    imgArr : [],
    videoArr:[],
    videoTitle1:'视频标题1',
    videoTitle2:'视频标题2'
  },
  '10006' : {
    'type' : '10006',
    'itType' : '1' ,
    'structure' : '1' ,
    'radio':'1',
    'detailsArr':[]
  },
  '20001' : {
    'type' : '20001',
    'title' : '公司简介' ,
    'logoUrl' : 'static/img/title/dian.png',
    'logoCosid' :0,
    'content':'请填写公司简介'
  },
  '20002' : {
    'type' : '20002',
    'title' : '企业资讯' ,
    'logoUrl' : 'static/img/title/dian.png',
    'logoCosid' :0,
    'infoObjIdArr':[]
  },
  '20003' : {
    'type' : '20003',
    'title' : '管理团队' ,
    'logoUrl' : 'static/img/title/ren.png',
    'logoCosid' :2,
    'userArr':
    [
      {
        "teamName":'姓名',
        "job":'职位',
        "info":'内容',
        "jumpIs":'0',
        'cardObj':{}
      }
    ]
  },
  '20004' : {
    'type' : '20004',
    'title' : '合作伙伴' ,
    'logoUrl' : 'static/img/title/xing.png',
    'logoCosid' :3,
    'imgArr':['','',''],
    'imgType':'1'
  },
  '20005' : {
    'type' : '20005',
    'title' : '联系我们' ,
    'logoUrl' : 'static/img/title/ditu.png',
    'logoCosid' :5,
    'infoArr':[]
  },
  '20006' : {
    'type' : '20006',
    'title' : '企业招聘' ,
    'logoUrl' : 'static/img/title/lingjin.png',
    'logoCosid' :4,
    'infoObjIdArr':[]
  },
  '20007' : {
    'type' : '20007',
    'title' : '名片' ,
    'logoUrl' : 'static/img/title/wenjian.png',
    'logoCosid' :8,
    'bcardArr':[
      {id:'',jumpIs:'0',name:'姓名',position:'职位'}
    ]
  },
}