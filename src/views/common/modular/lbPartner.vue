<template>
  <section class="lb-partner-wrap">
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
            <i class="g-back" :style="'backgroundImage:url(static/img/title/'+m+')'"></i>
          </li>
        </ul>
      </el-col>
    </div>
    <div class="list-box">
      <h4 class="title">
        <span>样式选择:</span>
        <span>(切换样式将导致当前的内容丢失)</span>
      </h4>
      <ul class="img-ul-box">
        <li 
          v-for="(m,i) in 2" 
          :key="i" 
          :class="{'on':obj.imgType == m}"
          @click="imgTypeFn(m)"
        >
          <div class="g-back"></div>
          <p v-if="m==1">横版LOGO</p>
          <p v-else-if="m==2">竖版LOGO</p>
        </li>
      </ul>
    </div>
    <div class="list-box">
      <h4 class="title">
        <span>图片编辑:</span>
        <span>(图片大小不超过2M,支持jpg、png格式，最多可上传12张)</span>
      </h4>
      <section class="lb-add-img-box">
        <ul class="img-ul">
          <li 
            class="g-back" 
            :style="'backgroundImage:url('+(obj.imgArr[i]?obj.imgArr[i].thumUrl:initImg)+')'"
            v-for="(m,i) in obj.imgArr"
            :key="i"
            :class="{'on':imgInd == i}"
            @click="imgInd = i"
          >
            <i class="iconfont icon-remove remove" v-if="i>0" @click.stop="removeFn(i)"></i>
          </li>

          <li 
            class="add-li g-cen-cen" 
            @click="addImgFn"
            v-if="obj.imgArr.length <12"
          >
            <i class="iconfont icon-add add"></i></li>
        </ul>
      </section>
      <!-- 上传图片 -->
      <section class="lb-up-img-box">
        <div 
          class="up-box g-back" 
          :style="'backgroundImage:url('+(obj.imgArr[imgInd]?obj.imgArr[imgInd].thumUrl:initImg)+')'" 
          @click="lbCropperOpen"
        >
          <span v-if="!obj.imgArr[imgInd]">上传图片</span>
          <div class="back-box g-cen-cen">
            <i class="iconfont icon-up-img"></i><span>上传图片</span>
          </div>
        </div>
        <p>最佳尺寸：{{autoCropObj.autoCropWidth}}*{{autoCropObj.autoCropHeight}}px</p>
        <p>建议上传白色背景横版商标图片</p>
      </section>
    </div>
    <!-- 上传图片 -->
    <lb-cropper ref="lbCropperId" @uploadAvatar="uploadAvatar"></lb-cropper>
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import LbCropper from '$offcom/cropper/lbCropper';
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components:{LbCropper},
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
      initImg:'static/img/img/up.png',
      obj : {
        imgArr :[]
      },
      autoCropObj :{
        autoCropWidth : 210,
        autoCropHeight : 90
      },
      sizeObj :{
        '1':{
          autoCropWidth : 210,
          autoCropHeight : 90
        },
        '2':{
          autoCropWidth : 135,
          autoCropHeight : 135
        }
      },
      imgInd:0
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
      let logoUrl = 'static/img/title/'+name;
          Object.assign(this.obj,{logoUrl,logoCosid});
          this.setPageData(this.obj);
          this.obj.logoCosid = logoCosid;
    },
    //选择图片类型
    imgTypeFn (num) {
      this.obj.imgType = num;
      this.autoCropObj = this.sizeObj[num];
    },
    //添加图片数组
    addImgFn () {
      this.obj.imgArr.push('');
    },
    //打开上传图片--组件
    lbCropperOpen () {
      this.$refs.lbCropperId.init(this.autoCropObj)
    },
    //上传图片成功
    uploadAvatar (obj) {
      if(this.obj.imgArr.length ==0){
        this.obj.imgArr.push(obj);
      } else{
        this.obj.imgArr.splice(this.imgInd,1,obj)
      }
    },
    //删除图片
    removeFn (num) {
      this.obj.imgArr.splice(num,1)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.lb-partner-wrap{
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

  .list-box{
    padding-left: 15px;
    overflow: hidden;
    &>.title{
      line-height: 46px;
      span{
        &:first-child{
          font-size: 14px;
        }
        &:last-child{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .img-ul-box{
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 10px;
    li{
      float: left;
      margin-right: 30px;
      overflow: hidden;
      div{
        height: 80px;
        width: 80px;
        border:1px solid transparent;
      }
      p{
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        padding-top: 5px;
      }
      &:nth-child(1){
        div{
          background-image: url('/static/img/partner/img1.png');
        }
      }
      &:last-child{
        div{
          background-image: url('/static/img/partner/img2.png');
        }
      }
      &.on{
        div{
          border-color: #7fc0f6;
        }
        p{
          color: #7fc0f6;
        }
      }
    }
  }
  .input-num-box{
    width: 100%;
    overflow: hidden;
    padding-bottom: 10px;
    span{
      font-size: 12px;
    }
  }
}
</style>
