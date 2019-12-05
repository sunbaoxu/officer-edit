<template>
  <section class="lb-page-team-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <section class="team-box" >
      <ul class="team-ul">
        <li 
          v-for="(m,i) in obj.userArr" 
          :key="i"
          :class="{'on':m.jumpIs == '1' && m.id}"
        >
          <i></i>
          <dl>
            <dt class="g-back" :style="'backgroundImage:url('+(m.imgObj ? m.imgObj.fileUrl: initImg)+')'"></dt>
            <dd>
              <h6 class="g-text-ove1">{{m.teamName}}</h6>
              <p class="pos g-border g-text-ove1">{{m.job}}</p>
              <p class="text">{{m.info}}</p>
            </dd>
          </dl>
        </li>
      </ul>
    </section>
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
      initImg:'static/img/img/up.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-team-wrap{
  padding-left: 15px;
  .team-box{
    .team-ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 165px;
        background: #fff;
        border-radius: 6px;
        margin-right: 15px;
        margin-bottom: 15px;
        overflow: hidden;
        position: relative;
        &.on{
          &>i{
            display: block;
          }
        }
        &>i{
          background: url('/static/img/bus-card/mark.png') no-repeat top right;
          background-size: 24px;
          position:absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 24px;
          display: none;
        }
        dl{
          dt{
            height: 130px;
          }
          dd{
            padding:10px 10px 10px;
            h6{
              font-size: 14px;
              line-height: 16px;
              padding-bottom: 4px;
              font-weight: 700;
            }
            .pos{
              color: #AFAFAF;
              font-size: 12px;
              line-height: 20px;
              padding-bottom: 10px;
            }
            .text{
              color: #999;
              font-size: 12px;
              line-height: 18px;
              padding:4px 0;
              word-wrap:break-word;
            }
          }
        }
      }
    }
  }
}
</style>
