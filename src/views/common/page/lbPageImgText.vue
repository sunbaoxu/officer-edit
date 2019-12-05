<template>
  <section class="lb-page-img-wrap g-pos-rel">
    <!-- 样式一 -->
    <section class="type1-box lb-text-main" v-if="obj.itType == '1' && obj.detailsArr[0]">
      <lb-static-title :obj="obj.detailsArr[0]" v-if="obj.structure=='1'" />
      <img :src="obj.detailsArr[0].imgObj.fileUrl?obj.detailsArr[0].imgObj.fileUrl:initImg" alt="">
      <lb-static-title :obj="obj.detailsArr[0]" v-if="obj.structure=='2'" />
    </section>
    <!-- 样式二 -->
    <section class="type2-box" v-if="obj.itType == '2'">
      <dl
        v-for="(m,i) in obj.detailsArr" 
        :key="i" 
        class="type-dl"
      >
        <dt v-if="obj.structure=='3'" class="g-back" :style="'backgroundImage:url('+(m.imgObj ? m.imgObj.fileUrl: initImg)+')'"></dt>
        <dd class="g-col-fen">
          <h4 class="g-text-ove1 h4">{{m.mainTitle}}</h4>
          <h6 class="g-text-ove1 h6">{{m.subheading}}</h6>
        </dd>
        <dt v-if="obj.structure=='4'" class="g-back on" :style="'backgroundImage:url('+(m.imgObj ? m.imgObj.fileUrl: initImg)+')'"></dt>
      </dl>
    </section>
    <!-- 样式三 -->
    <section class="type3-box" v-if="obj.itType == '3'">
      <div class="type-ul">
        <dl 
          v-for="(m,i) in obj.detailsArr" 
          :key="i" 
          :class="{'on':obj.radio =='2'}"
        >
          <dt
            class="g-back" 
            :style="'backgroundImage:url('+(m.imgObj ? m.imgObj.fileUrl: initImg)+')'"
          ></dt>
          <dd>
            <lb-static-title :obj="m" class="lb-static-text-wrap" />
          </dd>
        </dl>
      </div>
    </section>
    <!-- 宫格图 -->
    <section class="type4-box" v-if="obj.itType == '4'">
      <ul class="type-ul">
        <li 
          v-for="(m,i) in obj.detailsArr" 
          :key="i" 
          :class="{
            'li3':obj.maxColumnNum == '3',
            'li4':obj.maxColumnNum == '4'
          }"
        >
          <dl>
            <dt class="g-back" :style="'backgroundImage:url('+(m.imgObj ? m.imgObj.fileUrl: initImg)+')'"></dt>
            <dd>
              <lb-static-title :obj="m" />
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
import LbStaticTitle from './common/title/lbStaticText';
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
    LbStaticTitle
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
  .type1-box{
    padding-right: 15px;
    border-radius: 4px;
    img{
      display: block;
      width: 100%;
    }
  }
  .type2-box{
    padding-right: 15px;
    .type-dl{
      display: flex;
      padding:15px;
      background: #fff;
      margin-bottom: 15px;
      border-radius: 6px;
      box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
      dt{
        height:74px;
        width: 84px;
        margin-right: 15px;
        min-width: 84px;
        border-radius: 4px;
        &.on{
          margin-right: 0;
          margin-left: 15px;
        }
      }
      dd{
        width: 0;
        flex:1;
        &>.h4{
          font-size: 14px;
        }
        &>.h6{
          color: #999;
          font-size: 12px;
        }
      }
    }    
  }
  .type3-box{
    .type-ul{
      display: flex;
      overflow: hidden;
      dl{
        width: 220px;
        min-width: 220px;
        background: #fff;
        box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
        margin-right: 15px;
        border-radius: 4px;
        overflow: hidden;
        dt{
          height: 130px;
        }
        &.on{
          width: 140px;
          min-width: 140px;
          dt{
            height: 120px;;
          }
        }
        dd{
          .lb-static-text-wrap{
            padding:10px 15px;
          }
        }
      }
    }
  }
  
  .type4-box{
    .type-ul{
      display: flex;
      flex-wrap:wrap;
      li{
        width: 165px;
        margin-right: 15px;
        margin-bottom: 15px;
        box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        background: #fff;
        overflow: hidden;
        &.li3{
          width: 105px;
          dl>dt{
            height: 105px;
          }
        }
        &.li4{
          width: 75px;
          dl>dt{
            height: 75px;
          }
        }
        dl{
          dt{
            height: 130px;
          }
          dd{
            .lb-static-text-wrap{
              padding:10px 15px;
            }
          }
        }
      }
    }
  }
}

.lb-text-main{
  .text-main{
    background: #fff;
    padding:15px;
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
