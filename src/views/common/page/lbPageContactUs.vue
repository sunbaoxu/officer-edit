<template>
  <section class="lb-page-contact-us-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <ul class="con-us-main" v-if="obj.infoArr.length >0">
      <li v-for="(m,i) in obj.infoArr" :key="i">
        <p>{{m.title}}</p>
        <div class="box g-cen-y">
          <p class="g-text-ove1">{{m.type ==1?m.addressInfo:m.phone}}</p>
          <div class="detail g-cen-y">
            <span class="xian"></span>
            <span class="span"><i class="iconfont" :class="m.type==1?'icon-dizhi':'icon-phone'"></i></span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="con-us-back g-cen-cen">
      <p>从右侧设置添加地址及电话</p>
    </div>
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
  }
}
</script>

<style lang="scss" scoped>
.lb-page-contact-us-wrap{
  padding:0 15px 15px;
  .con-us-main{
    li{
      margin-bottom: 10px;
      padding:15px 0 15px 15px;
      background: #fff;
      border-radius: 4px;
      box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
      &>p{
        font-size: 12px;
        color: #999;
        padding-bottom: 10px;
      }
      .box{
        display: flex;
        height: 23px;
        &>p{
          flex:1;
          width: 0;
          color: #333;
          font-weight: 700;
          margin-right: 10px;
        }
      }
      .detail{
        height: 100%;
        width: 50px;
        .xian{
          height: 15px;
          width: 1px;
          background: #ccc;
        }
        .span{
          width: 0;
          flex:1;
          text-align: center;
          color: rgb(30,161,20);
          i{
            font-size: 22px;
          }
        }
      }
    }
  }
  .con-us-back{
    background: #fff;
    height: 240px;
    border-radius: 4px;
    box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);

  }
}
</style>
