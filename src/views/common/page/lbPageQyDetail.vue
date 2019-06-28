<template>
  <section class="lb-page-qy-detail-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <p class="text">{{obj.content}}</p>
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
  }
}
</script>

<style lang="scss" scoped>
.lb-page-qy-detail-wrap{
  padding:0 15px 15px;
  .text{
    padding:15px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
