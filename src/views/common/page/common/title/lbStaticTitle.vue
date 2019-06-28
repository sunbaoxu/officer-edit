<template>
  <section class="lb-static-title-wrap g-cen-y">
    <i class="g-back" :style="'backgroundImage:url('+obj.logoUrl+')'"></i>
    <span>{{obj.title}}</span>
  </section>
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
.lb-static-title-wrap{
  padding-top: 30px;
  padding-bottom: 15px;
  &>i{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  span{

  }
}
</style>
