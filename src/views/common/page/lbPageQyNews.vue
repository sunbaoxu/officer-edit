<template>
  <section class="lb-page-news-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <section class="news-main">
      <ul>
        <li
          v-for="(m,i) in obj.infoObjIdArr"
          :key="i"
        >
          <dl>
            <dd class="g-col-fen">
              <h6 class="g-text-ove2">{{m.title}}</h6>
              <p>
                <span>{{m.createDate || '时间'}}</span>
                <span class="text">官方</span>
              </p>
            </dd>
            <dt class="g-back" 
            :style="'backgroundImage:url('+(m.coverImage?m.coverImage:initImg)+')'"></dt>
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
  data (){
    return {
      initImg:'static/img/img/up.png',
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-page-news-wrap{
  padding:0 15px 15px;
  .news-main{
    li{
      padding:15px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
      box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
      dl{
        display: flex;
        dt{
          width:80px;
          height: 80px;
        }
        dd{
          width: 0;
          flex: 1;
          margin-right: 10px;
          h6{
            font-weight: 700;
          }
          p{
            color: #999;
            font-size: 12px;
            .text{
              line-height: 20px;
              background: #eee;
              padding:0 4px;
              border-radius: 4px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
