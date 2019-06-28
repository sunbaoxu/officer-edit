<template>
  <section class="lb-back-wrap">
    <div class="back-main" :class="{'on':async}" @click="clickFn">
      <div class="back-aside">
        <p class="g-cen-cen" @click.stop="clickIconFn('up')" :class="{'no':ind == 0}"><i class="iconfont icon-up"></i></p>
        <p class="g-cen-cen" @click.stop="clickIconFn('down')"  :class="{'no':ind == pageArr.length-1}"><i class="iconfont icon-down"></i></p>
        <p class="g-cen-cen" @click.stop="clickIconFn('remove')"><i class="iconfont icon-close"></i></p>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  props : {
    async : {
      type : Boolean,
      default : false
    },
    ind : {
      type : Number,
      default :0
    }
  },
  computed: {...mapGetters(['pageArr'])},
  methods : {
    ...mapActions(['setPageArr']),
    //点击当前组件
    clickFn () {
      this.setPageArr({type:'click',position:'now',ind:this.ind})
    },
    //点击icon
    clickIconFn (name) {
      this.setPageArr({type:'click',position:name,ind:this.ind})
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-back-wrap{
  position:absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  .back-main{
    height: 100%;
    position: relative;
    background: rgba(0,0,0,0.5);
    &.on{
      background: transparent;
    }
    .back-aside{
      position:absolute;
      right: -46px;
      top: 0;
      background: #1d3463;
      width: 46px;
      color: #fff;
      display: none;
      p{
        height: 46px;
        &:last-child{
          background: #182a50;
        }
        &.no{
          display: none;
        }
      }
      i{
        font-size: 20px;
      }
    }
  }
}
.lb-back-wrap:hover{
  .back-main{
    .back-aside{
      display: block;
    }
  }
}
</style>
