<template>
  <section class="lb-img-wrap">
    <div class="list-box">
      <h4 class="title">
        <span>选择图片:</span>
        <span>(图片大小不超过2M,支持jpg、png格式，最多可上传10张)</span>
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
            <i class="iconfont icon-remove remove" v-if="i>1" @click.stop="removeFn(i)"></i>
          </li>

          <li 
            class="add-li g-cen-cen" 
            @click="addImgFn"
            v-if="obj.imgArr.length <=10"
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
      </section>
    </div>
    <!-- 上传图片 -->
    <lb-cropper ref="lbCropperId" @uploadAvatar="uploadAvatar"></lb-cropper>
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import LbCropper from '$offcom/cropper/lbCropper'
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components:{LbCropper},
  watch : {
    obj (newObj,oldTitle) {
      this.setPageData(newObj)
    },
    currentObj (){
      this.init()
    }
  },
  data () {
    return {
      obj : {
        imgArr :[]
      },
      initImg:'/static/img/img/up.png',
      dialogFormVisible : false,
      autoCropObj :{
        autoCropWidth : 750,
        autoCropHeight : 400
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
      })
    },
    //动态设置属性
    setPageData (newObj) {
      this.setPageArr({obj:newObj,id:this.currentObj.id});
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
.lb-img-wrap{
  padding-left: 15px;
  .list-box{
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
          background-image: url('/static/img/img/img1.png');
        }
      }
      &:nth-child(2){
        div{
          background-image: url('/static/img/img/img2.png');
        }
      }
      &:nth-child(3){
        div{
          background-image: url('/static/img/img/img3.png');
        }
      }
      &:last-child{
        div{
          background-image: url('/static/img/img/img4.png');
        }
      }
      &:hover{
        &:nth-child(2){
          div{
            background-image: url('/static/img/img/img2.gif');
          }
        }
      }
      img{
        display: block;
        width: 100%;
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

