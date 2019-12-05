<template>
  <section class="officer-index-wrap">
    <!-- 头部 -->
    <!-- <lb-header></lb-header> -->
    <section class="officer-main">
      <!-- 左侧菜单栏 -->
      <lb-menu></lb-menu>
      <section class="con-box-wrap">
        <section class="page-wrap">
          <div class="head-box">
            官网
            <span></span>
          </div>
          <section v-for="(m,i) in pageArr" :key="i">
            <!-- 标题 -->
            <lb-page-title v-if="m.type == '10001'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 文本 -->
            <lb-page-text v-else-if="m.type == '10002'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 图片 -->
            <lb-page-img v-else-if="m.type == '10003'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 轮播图 -->
            <lb-page-banner v-else-if="m.type == '10004'" :imgArr="m.imgArr" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 视频 -->
            <lb-page-video v-else-if="m.type == '10005'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 图文 -->
            <lb-page-img-text v-else-if="m.type == '10006'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 企业简介 -->
            <lb-page-qy-detail v-else-if="m.type == '20001'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 企业资讯 -->
            <lb-page-qy-news v-else-if="m.type == '20002'" :obj="m" :ind="i" :async="currentObj.id == m.id"/>
            <!-- 管理团队 -->
            <lb-page-team v-else-if="m.type == '20003'" :obj="m" :ind="i" :async="currentObj.id == m.id" />
            <!-- 合作伙伴 -->
            <lb-page-partner v-else-if="m.type == '20004'" :obj="m" :ind="i" :async="currentObj.id == m.id" />
            <!-- 联系我们 -->
            <lb-page-contact-us v-else-if="m.type == '20005'" :obj="m" :ind="i" :async="currentObj.id == m.id" />
            <!-- 企业招聘 -->
            <lb-page-qy-recruit v-else-if="m.type == '20006'" :obj="m" :ind="i" :async="currentObj.id == m.id" />
            <!-- 名片 -->
            <lb-page-bus-card v-else-if="m.type == '20007'" :obj="m" :ind="i" :async="currentObj.id == m.id" />
          </section>
          <div v-if="pageArr.length <=0" class="ind-page-box g-col-cen-cen-box">
            <div class="g-back" :style="'backgroundImage:url('+require('@/assets/img/img/up.png')+')'"></div>
            <p>还没有可以编辑的内容组件</p>
          </div>
        </section>
      </section>
      <section class="rig-box-wrap">
        <h4 class="head-title g-border">{{currentObj.name}}设置</h4>
        <!-- 标题 -->
        <lb-title v-if="currentObj.type == '10001'"/>
        <!-- 文本 -->
        <lb-text v-else-if="currentObj.type == '10002'"/>
        <!-- 图片 -->
        <lb-img v-else-if="currentObj.type == '10003'"/>
        <!-- 轮播图 -->
        <lb-banner v-else-if="currentObj.type == '10004'"/>
        <!-- 视频 -->
        <lb-video v-else-if="currentObj.type == '10005'"/>
        <!-- 图文 -->
        <lb-img-text v-else-if="currentObj.type == '10006'"/>
        <!-- 企业简介 -->
        <lb-qy-detail v-else-if="currentObj.type == '20001'" />
        <!-- 企业资讯 -->
        <lb-qy-news v-else-if="currentObj.type == '20002'"/>
        <!-- 管理团队 -->
        <lb-team v-else-if="currentObj.type == '20003'"/>
        <!-- 合作伙伴 -->
        <lb-partner v-else-if="currentObj.type == '20004'"/>
        <!-- 联系我们 -->
        <lb-contact-us v-else-if="currentObj.type == '20005'"/>
        <!-- 企业招聘 -->
        <lb-qy-recruit v-else-if="currentObj.type == '20006'"/>
        <!-- 名片 -->
        <lb-bus-card v-else-if="currentObj.type == '20007'"/>
        <div v-else class="ind-page-box g-col-cen-cen-box">
          <div class="g-back" :style="'backgroundImage:url('+require('@/assets/img/img/up.png')+')'"></div>
          <p>还没有可以编辑的内容组件</p>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
// import api from '@/api/api';
// import LbHeader from './common/header/lbHeader';
import LbMenu from './common/tools/lbMenu';
//标题
import LbPageTitle from './common/page/lbPageTitle';
import LbTitle from './common/modular/lbTitle';
//文本
import LbPageText from './common/page/lbPageText';
import LbText from './common/modular/lbText';
//图片
import LbPageImg from './common/page/lbPageImg';
import LbImg from './common/modular/lbImg';
//轮播图
import LbPageBanner from './common/page/lbPageBanner';
import LbBanner from './common/modular/lbBanner';
//视频
import LbPageVideo from './common/page/lbPageVideo';
import LbVideo from './common/modular/lbVideo';
//图文
import LbPageImgText from './common/page/lbPageImgText';
import LbImgText from './common/modular/lbImgText';
//企业简介
import LbPageQyDetail from './common/page/lbPageQyDetail';
import LbQyDetail from './common/modular/lbQyDetail';
//企业资讯
import LbPageQyNews from './common/page/lbPageQyNews';
import LbQyNews from './common/modular/lbQyNews';
//管理团队
import LbPageTeam from './common/page/lbPageTeam';
import LbTeam from './common/modular/lbTeam';
// 合作伙伴
import LbPagePartner from './common/page/lbPagePartner';
import LbPartner from './common/modular/lbPartner';
// 联系我们
import LbPageContactUs from './common/page/lbPageContactUs';
import LbContactUs from './common/modular/lbContactUs';
// 联系我们
import LbPageQyRecruit from './common/page/lbPageQyRecruit';
import LbQyRecruit from './common/modular/lbQyRecruit';
// 名片
import LbPageBusCard from './common/page/lbPageBusCard';
import LbBusCard from './common/modular/lbBusCard';
import {mapGetters,mapActions} from 'vuex';
export default {
  components : {
    // LbHeader,
    LbMenu,
    LbPageTitle,
    LbTitle,
    LbPageText,
    LbText,
    LbPageImg,
    LbImg,
    LbPageBanner,
    LbBanner,
    LbPageVideo,
    LbVideo,
    LbPageImgText,
    LbImgText,
    LbPageQyDetail,
    LbQyDetail,
    LbPageContactUs,
    LbContactUs,
    LbPagePartner,
    LbPartner,
    LbPageBusCard,
    LbBusCard,
    LbPageTeam,
    LbTeam,
    LbPageQyNews,
    LbQyNews,
    LbPageQyRecruit,
    LbQyRecruit
  },
  computed: {...mapGetters(['pageArr','currentObj','midObj'])},
  methods : {
    ...mapActions(['setPageArr']),
    init() {
      // this.checkTemplateIssueStatue()
    },
    //页面是否重新刷新
    beforeunloadFn (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      return '关闭提示';
    },
    //是否有变更
    checkTemplateIssueStatue () {
      let obj ={
        mid : this.midObj.mid
      }
      api.checkTemplateIssueStatue(obj).then((res)=>{
        if(res.code ==1){
          if(res.data){
            this.$confirm('系统检测到您有未发布的内容，是否导入?', '提示', {
              confirmButtonText: '导入',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.getTemplateInfo(0)
            }).catch(() => {
              this.getTemplateInfo(1)       
            });
 
          } else{
            this.getTemplateInfo(1) 
          }
        }
      })
    },
    //获取模板信息
    getTemplateInfo (num) {
      let obj={
        type :num,
        mid : this.midObj.mid
      }
      api.getTemplateInfo(obj).then((res)=>{
        if(res.code ==1 && res.data){
          this.setPageArr({type:'init',arr:JSON.parse(res.data)});
          //页面是否重新刷新
          window.addEventListener('beforeunload', this.beforeunloadFn, false);
        }
      })
    }
  },
  mounted () {
    this.init();
  },
  destroyed(){
    window.removeEventListener('beforeunload', this.beforeunloadFn, false);
  }
}
</script>

<style lang='scss' scoped>
.officer-index-wrap:hover{
  cursor:pointer;
}
.officer-index-wrap{
  .officer-main{
    display: flex;
    height: 100vh;
    background: #eee;
  }
  .con-box-wrap{
    flex:1;
    min-width: 400px;
    padding-top: 100px;
    overflow-y:auto;
    padding-bottom: 100px;
    .page-wrap{
      width: 377px;
      border:1px solid #ccc;
      margin:0 auto;
      padding-bottom: 15px;
      .head-box{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: #000;
      }
    }
  }
  .rig-box-wrap{
    width: 498px;
    min-width: 498px;
    height: 100%;
    background: #fff;
    overflow-y:auto;
    padding-bottom: 20px;
    &>.head-title{
      line-height: 40px;
      text-align: center;
    }
  }
  .ind-page-box{
    height: 300px;
    width: 100%;
    background: rgb(247,248,252);
    &>div{
      height: 100px;
      width: 260px;
    }
    p{
      padding-top: 30px;
      font-size: 20px;
    }
  }
}
</style>
