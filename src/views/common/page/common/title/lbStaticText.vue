<template>
  <div class="lb-static-text-wrap" :class="{'left':obj.align == '1','cen':obj.align == '2'}">
    <h4 class="title1 g-text-ove1" v-if="obj.mainTitleAsync">{{obj.mainTitle}}</h4>
    <h6 class="title2 g-text-ove1" v-if="obj.subheadingAsync">{{obj.subheading}}</h6>
    <p class="text" v-if="obj.contentAsync">{{obj.content}}</p>
  </div>
</template>

<script>
export default {
  props : {
    obj : {
      type : Object,
      default :function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-static-text-wrap{
  background: #fff;
  padding:15px;
  &.cen{
    text-align: center;
  }
  .title1{
    font-size: 16px;
    line-height: 30px;
  }
  .title2{
    line-height: 26px;
    color: #999;
    font-size: 12px;
  }
  .text{
    font-size: 14px;
    word-wrap:break-word;
    color: #666;
  }
}

</style>
