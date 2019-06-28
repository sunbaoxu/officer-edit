<template>
  <section class="lb-page-bus-card-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <ul class="bus-card-main">
      <li 
        v-for="(m,i) in obj.bcardArr" 
        :key="i"
        :class="{'on':m.jumpIs == '1'}"
      >
        <dl class="">
          <dd class="g-col-fen">
            <div>
              <h6>{{m.name}}</h6>
              <p class="hui">{{m.jobRank}}</p>
            </div>
            <div>
              <p>手机：{{m.phone}}</p>
              <p>邮箱：{{m.email}}</p>
            </div>
          </dd>
          <dt class="g-back" :style="'backgroundImage:url('+(m.fileUrl ||(m.pid&&logoImg)|| initImg)+')'"></dt>
        </dl>
      </li>
    </ul>
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
      initImg:'/bx-officer/static/img/bus-card/img1.png',
      logoImg:'/bx-officer/static/img/bus-card/logo.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-bus-card-wrap{
  padding:0 15px 15px;
  .bus-card-main{
    li{
      padding:15px;
      border-radius: 6px;
      box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
      margin-bottom: 15px;
      background-color: #fff;
      &.on{
        background: url('/bx-officer/static/img/bus-card/mark.png') no-repeat top right;
        background-color: #fff;
        background-size: 24px;
      }
      dl{
        display: flex;
        dt{
          height: 100px;
          width: 100px;
          border-radius: 4px;
        }
        dd{
          width: 0;
          flex:1;
          div{
            h6{
              font-size: 14px;
              padding-bottom: 4px;
            }
            p{
              font-size: 12px;
              color: #999;
              &.hui{
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
}
</style>
