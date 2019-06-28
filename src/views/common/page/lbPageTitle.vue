<template>
  <section class="lb-page-title-wrap g-cen-y g-pos-rel">
    <i class="g-back" :style="'backgroundImage:url('+obj.logoUrl+')'"></i>
    <span>{{obj.mainTitle}}</span>
    <lb-back :async="async" :ind="ind"/>
  </section>
</template>

<script>
import lbBack from '$offcom/header/lbBack';
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
    lbBack
  }
}
</script>

<style lang="scss" scoped>
.lb-page-title-wrap{
  background: #fff;
  height: 60px;
  padding-left: 15px;
  &>i{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  span{

  }
}
</style>
