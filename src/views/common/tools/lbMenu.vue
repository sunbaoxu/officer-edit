<template>
  <section class="lb-menu-wrap">
    <!-- 按钮 -->
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#58B7FF">
      <el-menu-item index="1">模板组件</el-menu-item>
      <el-menu-item index="2">基本组件</el-menu-item>
    </el-menu>
    <!-- 组件 -->
    <ul class="main-ul" v-show="activeIndex == '1'">
      <li 
        v-for="(m,i) in arr" 
        :key="i"
        :class="['g-col-cen-cen-box',{'lef':i%2==0,'rig':i%2==1}]"
        @click="addMenuFn(m)"
      >
        <i class="iconfont" :class="classTypeFn(m.type)"></i>
        <span>{{m.name}}</span>
      </li>
    </ul>

    <ul class="main-ul" v-show="activeIndex == '2'">
      <li 
        v-for="(m,i) in arr1" 
        :key="i"
        :class="['g-col-cen-cen-box',{'lef':i%2==0,'rig':i%2==1}]"
        @click="addMenuFn(m)"
      >
        <i class="iconfont" :class="classTypeFn(m.type)"></i>
        <span>{{m.name}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props : {
    obj : {
      type : Object,
      default :function () {
        return {}
      }
    }
  },
  data () {
    return {
      activeIndex :'1',
      arr:[
        {name:'企业简介',type:'20001'},
        {name:'企业资讯',type:'20002'},
        {name:'管理团队',type:'20003'},
        {name:'合作伙伴',type:'20004'},
        {name:'联系我们',type:'20005'},
        {name:'企业招聘',type:'20006'},
        {name:'名片',type:'20007'},
      ],
      arr1:[
        {name:'标题',type:'10001'},
        {name:'文本',type:'10002'},
        {name:'图片',type:'10003'},
        {name:'轮播图',type:'10004'},
        {name:'视频',type:'10005'},
        {name:'图文',type:'10006'}
      ]
    }
  },
  methods : {
    ...mapActions(['setPageArr']),
    //tab切换
    handleSelect (key,keyPath) {
      this.activeIndex = keyPath[0];
    },
    //选择组件
    addMenuFn (obj){
      this.setPageArr({obj})
    },
    classTypeFn (type){
      switch (type){
        case '20001':
          return 'icon-qiye'
        break;
        case '20002':
          return 'icon-zixun'
        break;
        case '20003':
          return 'icon-tuandui'
        break;
        case '20004':
          return 'icon-huoban'
        break;
        case '20005':
          return 'icon-fabu'
        break;
        case '20006':
          return 'icon-zhaopin'
        break;
        case '20007':
          return 'icon-card'
        break;
        case '10001':
          return 'icon-title'
        break;
        case '10002':
          return 'icon-text'
        break;
        case '10003':
          return 'icon-img'
        break;
        case '10004':
          return 'icon-swiper'
        break;
        case '10005':
          return 'icon-shipin'
        break;
        case '10006':
          return 'icon-tuwen'
        break;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.lb-menu-wrap{
  width: 201px;
  border-right: 1px solid #e1e1e1;
  height: 100vh;
  background: #fff;
  min-width: 201px;
  .main-ul{
    overflow: hidden;
    li{
      width: 100px;
      height: 100px;
      float: left;
      &.lef{
        border-right: 1px dotted #E1E1E1;
        border-bottom: 1px dotted #E1E1E1;
      }
      &.rig{
        border-bottom: 1px dotted #E1E1E1;
      }
      i{
        font-size: 30px;
      }
    }
    li:hover{
      cursor:pointer;
      color: #58B7FF;
      background: #e1e1e1;
    }
  }
}
</style>
