<template>
  <section class="lb-page-banner-wrap g-pos-rel">
    <swiper id="swiperBox" :options="swiperOption" ref="mySwiper" class="swiperId" v-if="swAsync">
      <swiper-slide class="swiper-slide" v-for="(m, index) in imgArr" :key="index">
        <div class="g-back lb-swiper-slide" :style="'backgroundImage:url('+(m.fileUrl || initImg)+')'"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination lb-nav g-cen-cen"></div>
    
    <lb-back :async="async" :ind="ind"/>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import lbBack from '$offcom/header/lbBack';
export default {
  props : {
    imgArr : {
      type : Array,
      default :function () {
        return []
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
    swiper,
    swiperSlide
  },
  watch : {
    imgArr (newObj,oldTitle) {
      this.swAsync= false;
      setTimeout(()=>{
        this.swAsync =true;
      })
    }
  },
  data () {
    return {
      initImg:'https://tsfile.labifenqi.com/staticFile/public/officer/img/up.png',
      swiperOption :{
        loop:true,
        autoplay:true,
        pagination:{
          el: '.swiper-pagination'
        }
      },
      swAsync: true
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-banner-wrap{
  .swiperId{
    height: 200px;
    .lb-swiper-slide{
      height: 200px;
    }
  }
  .lb-nav{
    position: absolute;
    bottom: 10px;
    width: 100%;
    
  }
}
</style>
<style lang="scss">
.lb-page-banner-wrap{
  .lb-nav{
    span{
      margin:0 2px;
    }
  }
}
</style>

