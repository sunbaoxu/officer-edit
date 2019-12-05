<template>
  <section class="lb-page-partner-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <ul class="partner-main">
      <li 
        v-for="(m,i) in obj.imgArr" 
        :key="i"
        class="g-back" 
        :style="'backgroundImage:url('+(m ? m.fileUrl: initImg)+')'"
        :class="{'on':obj.imgType ==2}"
      >
      </li>
    </ul>
    <lb-back :async="async" :ind="ind"/>
  </section>
</template>

<script>
import lbBack from '$offcom/header/lbBack';
import lbStaticTitle from './common/title/lbStaticTitle';
export default {
  props : {
    obj : {
      type : Object,
      default :function () {
        return {}
      }
    },
    ind : {
      type : Number,
      default :0
    },
    async : {
      type : Boolean,
      default : false
    }
  },
  components:{
    lbBack,
    lbStaticTitle
  },
  data () {
    return {
      initImg:'~@/assets/img/img/up.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-partner-wrap{
  padding:0 15px 15px;
  .partner-main{
    padding:15px 0 0px 15px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 94px;
      height: 45px;
      border-radius: 2px;
      margin-bottom: 15px;
      margin-right: 15px;
      &.on{
        width: 67px;
        height: 67px;
      }
    }
  }
}
</style>
