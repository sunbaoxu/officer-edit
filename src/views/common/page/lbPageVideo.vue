<template>
  <section class="lb-page-video-wrap g-pos-rel">
    <!-- 一个视频 -->
    <section class="video1-box" v-if="obj.imgType == '1'">
      <section class="video-list">
        <div 
          v-if="!obj.videoArr[0] || (obj.imgArr[0] && obj.imgArr[0].fileUrl)"
          class="g-back" 
          :style="'backgroundImage:url('+(obj.imgArr[0]?obj.imgArr[0].fileUrl:initImg)+')'"
        >
          <p class="video-icon"></p>
        </div>
        <lb-video-player 
          ref="lbVideoPlayerId" 
          v-else
          class="lb-video-wrap" 
          :obj="obj.videoArr[0]?obj.videoArr[0]:{}" 
        />
        <p>{{obj.videoTitle1}}</p>
      </section>
    </section>
    <!-- 两个视频 -->
    <section class="video4-box" v-if="obj.imgType == '2'">
      <ul class="video-ul g-fen-x">
        <li 
          v-for="(m,i) in obj.imgArr" 
          :key="i" 
          :class="{
            'li3':obj.maxColumnNum == '3',
            'li4':obj.maxColumnNum == '4'
          }"
        >
          <div 
            v-if="!obj.videoArr[i] || (m && m.fileUrl)"
            class="g-back" 
            :style="'backgroundImage:url('+(m ? m.fileUrl: initImg)+')'"
          >
            <p class="video-icon"></p>
          </div>
          <lb-video-player 
            ref="lbVideoPlayerId" 
            v-else
            class="lb-video-wrap" 
            :obj="obj.videoArr[i]?obj.videoArr[i]:{}" 
          />
          <p class="g-text-ove1">{{obj['videoTitle'+(i+1)]}}</p>
        </li>
      </ul>
    </section>
    <lb-back :async="async" :ind="ind"/>
  </section>
</template>

<script>
import lbBack from '$offcom/header/lbBack';
import LbVideoPlayer from '$offcom/tools/lbVideoPlayer'

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
    LbVideoPlayer
  },
  data () {
    return {
      initImg:'/bx-officer/static/img/img/up.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-video-wrap{
  padding:15px 0 15px 15px;
  .video1-box{
    padding-right: 15px;
    border-radius: 4px;
    .video-list{
      border-radius: 6px;
      overflow: hidden;
      &>div{
        height: 200px;
        position: relative;
        .video-icon{
          background: url('/bx-officer/static/img/video/video.png') no-repeat center;
          background-size: 100%;
          position:absolute;
          left: 50%;
          top: 50%;
          width: 50px;
          height: 50px;
          transform: translate(-50%,-50%);
        }
      }
      p{
        line-height: 46px;
        background: #fff;
        padding-left: 15px;
      }
    }
  }
  .video4-box{
    .video-ul{
      padding-right: 15px;
      li{
        width: 165px;
        background: #fff;
        border-radius: 6px;
        .lb-video-wrap{
          height: 100px;
        }
        div{
          height: 100px;
          position: relative;
          .video-icon{
            background: url('/bx-officer/static/img/video/video.png') no-repeat center;
            background-size: 100%;
            position:absolute;
            left: 50%;
            top: 50%;
            width: 30px;
            height: 30px;
            transform: translate(-50%,-50%);
          }
        }
        p{
          line-height: 46px;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.lb-page-video-wrap{
  .video-ul .video-js{
    .vjs-big-play-button{
      width:30px!important;
      height: 30px!important;
      line-height:30px!important;
      margin:0!important;
      transform: translate(-50%,-50%);
      span{
        line-height:28px;
      }
      .vjs-icon-placeholder{
        font-size: 20px;
      }
    }
  }
}
</style>
