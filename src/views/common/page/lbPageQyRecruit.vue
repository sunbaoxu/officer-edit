<template>
  <section class="lb-page-recruit-wrap g-pos-rel">
    <lb-static-title :obj="obj" />
    <section class="recruit-main">
      <ul>
        <li
          v-for="(m,i) in obj.infoObjIdArr"
          :key="i"
        >
          <div class="title-box g-cen-y">
            <h6 class="g-text-ove1">{{m.name}}</h6>
            <h6>{{m.salary}}</h6>
          </div>
          <p class="text-box g-cen-y">
            <span>{{m.city}}</span>
            <i></i>
            <span>{{m.experience}}</span>
            <i></i>
            <span>{{m.education}}</span>
          </p>
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
.lb-page-recruit-wrap{
  padding:0 15px 15px;
  .recruit-main{
    li{
      padding:15px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
      box-shadow:  0 2px 5px 0 rgba(0, 0, 0, 0.10);
      .title-box{
        h6{
          font-weight: 700;
          padding-bottom: 20px;
          &:first-child{
            width: 0;
            flex: 1;
            margin-right: 10px;
          }
          &:last-child{
            color: green;
          }
        }
      }
      .text-box{
        color: #ccc;
        font-size: 12px;
        i{
          width: 1px;
          height: 12px;
          background: #ccc;
          margin:0 10px;
        }
      }
    }
  }
}
</style>
