<template>
  <section class="lb-title-wrap">
    <div class="g-cen-y title-box">
      <el-col :span="4">组件标题：</el-col>
      <el-col :span="16" class="lb-input-box">
        <el-input
          placeholder="请输入内容"
          v-model="obj.title"
          width="100"
          maxlength ="15">
        </el-input>
        <span class="num g-cen-y">{{obj.title?obj.title.length:'0'}}/15</span>
      </el-col>
    </div>
    <div class="icon-box title-box">
      <el-col :span="4" class="title">选择图片：</el-col>
      <el-col :span="16">
        <ul class="icon-ul">
          <li 
            v-for="(m,i) in imgArr" 
            :key="i" 
            class="g-cen-cen"
            :class="{'on':i==obj.logoCosid}"
            @click="clickIconFn(m,i)"
          >
            <i class="g-back" :style="'backgroundImage:url(/bx-officer/static/img/title/'+m+')'"></i>
          </li>
        </ul>
      </el-col>
    </div>
    <div class="title-box">
      <el-col :span="4" class="title">内容：</el-col>
      <el-col :span="16" class="lb-textarea-box">
        <el-input
          type="textarea"
          v-model="obj.content"
          :rows="10"
          maxlength ="1000">
        </el-input>
        <span class="num g-cen-y">{{obj.content?obj.content.length:'0'}}/1000</span>
      </el-col>
    </div>
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  watch : {
    obj (newObj) {
      this.setPageData(newObj)
    },
    currentObj (){
      this.init()
    }
  },
  data () {
    return {
      imgArr : [
        'dian.png',
        'caidan.png',
        'ren.png',
        'xing.png',
        'lingjin.png',
        'ditu.png',
        'bofang.png',
        'huo.png',
        'wenjian.png',
        'phone.png'
      ],
      obj :{}
    }
  },
  methods : {
    ...mapActions(['setPageArr']),
    init () {
      this.pageArr.map((m,i)=>{
        if(m.id == this.currentObj.id){
          this.obj =m
        }
      });
    },
    //动态设置属性
    setPageData (newObj) {
      this.setPageArr({obj:newObj,id:this.currentObj.id}) ;
    },
    //选择icon
    clickIconFn (name,logoCosid) {
      let logoUrl = '/bx-officer/static/img/title/'+name;
          Object.assign(this.obj,{logoUrl,logoCosid});
          this.setPageData(this.obj);
          this.obj.logoCosid = logoCosid;
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.lb-title-wrap{
  padding-top: 10px;
  .title-box{
    padding-left: 15px;
    overflow: hidden;
  }
  .icon-box{
    padding-top: 20px;
    &>.title{
      line-height: 40px;
    }
  }
  .icon-ul{
    overflow: hidden;
    padding-top: 2px;
    li{
      float: left;
      border:1px solid transparent;
      height: 36px;
      width: 36px;
      margin-right: 20px;
      margin-bottom: 30px;
      &.on{
        border-color: #409EFF;
      }
      i{
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
