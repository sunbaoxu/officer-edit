<template>
  <section class="lb-page-img-wrap g-pos-rel">
    <!-- 一张图片 -->
    <section class="img1-box" v-if="obj.imgType == '1'">
      <img :src="obj.imgArr[0]?obj.imgArr[0].fileUrl:initImg" alt="">
    </section>
    <!-- 滑块图片 -->
    <section class="img2-box" v-if="obj.imgType == '2'">
      <ul class="img-ul">
        <li 
          v-for="(m,i) in obj.imgArr" 
          :key="i" 
          class="g-back" 
          :style="'backgroundImage:url('+(m ? m.fileUrl: initImg)+')'"
        ></li>
      </ul>
    </section>
    <!-- 三站图 -->
    <section class="img3-box" v-if="obj.imgType == '3'">
      <dl class="img-dl">
        <dt class="g-back" :style="'backgroundImage:url('+(obj.imgArr[0]?obj.imgArr[0].fileUrl:initImg)+')'"></dt>
        <dd class="g-col-fen">
          <div class="g-back" :style="'backgroundImage:url('+(obj.imgArr[1]?obj.imgArr[1].fileUrl:initImg)+')'"></div>
          <div class="g-back" :style="'backgroundImage:url('+(obj.imgArr[2]?obj.imgArr[2].fileUrl:initImg)+')'"></div>
        </dd>
      </dl>
    </section>
    <!-- 宫格图 -->
    <section class="img4-box" v-if="obj.imgType == '4'">
      <ul class="img-ul">
        <li 
          v-for="(m,i) in obj.imgArr" 
          :key="i" 
          class="g-back" 
          :style="'backgroundImage:url('+(m ? m.fileUrl: initImg)+')'"
          :class="{
            'li3':obj.maxColumnNum == '3',
            'li4':obj.maxColumnNum == '4'
          }"
        ></li>
      </ul>
    </section>
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
  },
  data () {
    return {
      initImg:'~@/assets/img/img/up.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-img-wrap{
  padding:15px 0 15px 15px;
  .img1-box{
    padding-right: 15px;
    border-radius: 4px;
    img{
      display: block;
      width: 100%;
    }
  }
  .img2-box{
    overflow: hidden;
    .img-ul{
      height: 120px;
      display: flex;
      li{
        height: 100%;
        width: 200px;
        min-width: 200px;
        border-radius: 4px;
        margin-right: 15px;
      }
    }
  }
  .img3-box{
    padding-right: 15px;
    .img-dl{
      height: 180px;
      display: flex;
      dt{
        width: 210px;
        height: 100%;
        box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
        margin-right: 15px;
        border-radius: 4px;
      }
      dd{
        width: 0;
        flex:1;
        div{
          width: 100%;
          box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
          height: 83px;
          border-radius: 4px;
        }
      }
    }    
  }
  .img4-box{
    .img-ul{
      display: flex;
      flex-wrap:wrap;
      li{
        width: 165px;
        height: 130px;
        margin-right: 15px;
        margin-bottom: 15px;
        box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        &.li3{
          width: 105px;
          height: 105px;
        }
        &.li4{
          width: 75px;
          height: 75px;
        }
      }
    }
  }
}
</style>
