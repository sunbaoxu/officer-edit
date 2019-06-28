<template>
  <section class="lb-header-wrap">
    <div class="lef g-cen-y">
      <img src="/h5-hzbmis/static/img/logo-icon.png" alt="">
      <span>{{midObj.tname}}商户平台</span>
    </div>
    <div class="rig g-cen-y">
      <!-- <button>更换模板</button> -->
      <button @click="saveOrIssueTemplateInfo(0)">保存</button>
      <!-- <button @click="saveOrIssueTemplateInfo(2)">预览</button> -->
      <button @click="saveOrIssueTemplateInfo(1)">发布</button>
    </div>
  </section>
</template>

<script>

import api from '@/api/api'
import globalFn from '@/assets/javascripts/globalFn'
import {mapGetters} from 'vuex';
export default {
  props : {
    obj : {
      type : Object,
      default :function () {
        return {}
      }
    }
  },
  computed: {...mapGetters(['pageArr','midObj'])},
  methods: {
    saveOrIssueTemplateInfo(num) {
      let obj = {
        mid:this.midObj.mid,
        pid:JSON.parse(globalFn.getCookieFn('lb-tuitui-jgpt-obj')).pid,
        saveType:num,
        templateInfo : JSON.stringify(this.pageArr)
      }
      api.saveOrIssueTemplateInfo(obj).then((res)=>{
        if(res.code ==1){
          this.$notify({
            title: '操作成功',
            message: `您已${num==1?'发布':'保存'}成功`,
            type: 'success',
            duration:2000
          });
 
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-header-wrap{
  height: 90px;
  background: #fff;
  color:#333;
  display: flex;
  padding:0 30px;
  box-shadow: 0px 3px 4px 0px #ccc;
  margin-bottom: 4px;
  .lef{
    flex:1;
    font-size: 16px;
    img{
      width: 46px;
      margin-right: 15px;
    }
  }
  .rig{
    button{
      height: 36px;
      background: transparent;
      border:1px solid #333;
      color: #333;
      margin-left: 15px;
      padding:0 20px;
      border-radius: 4px;
      font-size: 14px;
    }
    button:hover{
      color: #58B7FF;
      border-color: #58B7FF;
      cursor:pointer;
    }
  }
}
</style>
