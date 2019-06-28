<template>
  <section class="lb-title-wrap">
    <div class="g-cen-y title-box check-box">
      <el-col :span="4">内容设置：</el-col>
      <el-col :span="16" class="">
        <el-checkbox v-model="obj.mainTitleAsync">主标题</el-checkbox>
        <el-checkbox v-model="obj.subheadingAsync">副标题</el-checkbox>
      </el-col>
    </div>
    <div class="g-cen-y title-box check-box">
      <el-col :span="4">文字位置：</el-col>
      <el-col :span="16" class="">
        <el-radio v-model="obj.align" label="1">左侧对齐</el-radio>
        <el-radio v-model="obj.align" label="2">水平居中</el-radio>
      </el-col>
    </div>
    <div class="g-cen-y title-box" v-if="obj.mainTitleAsync">
      <el-col :span="4">主标题：</el-col>
      <el-col :span="16" class="lb-input-box">
        <el-input
          placeholder="请输入内容"
          v-model="obj.mainTitle"
          width="100"
          maxlength ="20">
        </el-input>
        <span class="num g-cen-y">{{obj.mainTitle?obj.mainTitle.length:'0'}}/20</span>
      </el-col>
    </div>
    <div class="g-cen-y title-box" v-if="obj.subheadingAsync">
      <el-col :span="4">副标题：</el-col>
      <el-col :span="16" class="lb-input-box">
        <el-input
          placeholder="请输入内容"
          v-model="obj.subheading"
          width="100"
          maxlength ="50">
        </el-input>
        <span class="num g-cen-y">{{obj.subheading?obj.subheading.length:'0'}}/50</span>
      </el-col>
    </div>
    <div class="title-box">
      <el-col :span="4" class="title">内容：</el-col>
      <el-col :span="16" class="lb-textarea-box">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="obj.content"
          :rows="4"
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
    obj (newObj,oldTitle) {
      this.setPageData(newObj);
    },
    currentObj (){
      this.init()
    }
  },
  data () {
    return {
      obj : {}
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
    padding-bottom: 10px;
  }
  .check-box{
    height: 40px;
  }
}
</style>

