<template>
  <section class="lb-page-text-wrap g-pos-rel">
    <div class="text-main" :class="{'left':obj.align == '1','cen':obj.align == '2'}">
      <h4 class="title1" v-if="obj.mainTitleAsync">{{obj.mainTitle}}</h4>
      <h6 class="title2" v-if="obj.subheadingAsync">{{obj.subheading}}</h6>
      <p class="text">{{obj.content}}</p>
    </div>
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
.lb-page-text-wrap{
  padding:15px;
  .text-main{
    background: #fff;
    padding:15px;
    border-radius: 4px;
    box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
    &.cen{
      text-align: center;
    }
  }
  .title1{
    font-size: 16px;
    line-height: 30px;
  }
  .title2{
    line-height: 30px;
    color: #999;
    font-size: 12px;
  }
  .text{
    font-size: 14px;
    word-wrap:break-word;
  }
}
</style>
