<template>
  <section class="lb-img-wrap">
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
          <p v-if="m==1">一个视频</p>
          <p v-else-if="m==2">两个视频</p>
        </li>
      </ul>
    </div>
    <div class="list-box">
      <h4 class="title">
        <span>视频封面:</span>
        <span>(图片大小不超过2M,支持jpg、png格式)</span>
      </h4>
      <section class="lb-add-img-box" v-if="obj.imgType !='1'">
        <ul class="img-ul">
          <li 
            class="g-back" 
            :style="'backgroundImage:url('+(obj.imgArr[i]?obj.imgArr[i].thumUrl:initImg)+')'"
            v-for="(m,i) in obj.imgArr"
            :key="i"
            :class="{'on':imgInd == i}"
            @click="imgIndFn(i)"
          >
          </li>
        </ul>
      </section>
      <!-- 上传图片 -->
      <section class="lb-up-img-box g-cen-y">
        <section>
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

        <section>
          <div 
            class="up-box up-box1"
          >
            <span v-if="!obj.videoArr[imgInd]">上传视频</span>
            <p class="video-icon"></p>
            <!-- 上传 -->
            <input 
              type="file" 
              id="teacherIntroductionVideo" 
              accept="audio/mp4, video/mp4" 
              ref="teacherIntroductionVideo"
              class="input-btn"
              @change="uploadTeacherVideo($event)" />
              <!-- 播放 -->
              <lb-video-player ref="lbVideoPlayerId" v-if="type == '3'" class="lb-video-wrap" :obj="obj.videoArr[imgInd]?obj.videoArr[imgInd]:{}" />
              <!-- 上传进度 -->
              <div class="tiao-box" v-else-if="type=='2'">
                <el-progress 
                  :percentage="progress" 
                  :status="progress==100?'success':'exception'"
                ></el-progress>
              </div>

            <div class="back-box g-cen-cen">
              <i class="iconfont icon-up-img"></i><span>上传视频</span>
            </div>
          </div>
          <p>视频类型必须是.mp4、.avi中的一种</p>
        </section>
        
      </section>
      <div class="g-cen-y title-box">
        <el-col :span="4">主标题：</el-col>
        <el-col :span="16" class="lb-input-box">
          <el-input
            placeholder="请输入内容"
            v-model="obj.videoTitle1"
            width="100"
            maxlength ="20">
          </el-input>
          <span class="num g-cen-y">{{obj.videoTitle1?obj.videoTitle1.length:'0'}}/20</span>
        </el-col>
      </div>
      <div class="g-cen-y title-box">
        <el-col :span="4">副标题：</el-col>
        <el-col :span="16" class="lb-input-box">
          <el-input
            placeholder="请输入内容"
            v-model="obj.videoTitle2"
            width="100"
            maxlength ="20">
          </el-input>
          <span class="num g-cen-y">{{obj.videoTitle2?obj.videoTitle2.length:'0'}}/20</span>
        </el-col>
      </div>
    </div>
    <!-- 上传图片 -->
    <lb-cropper ref="lbCropperId" @uploadAvatar="uploadAvatar"></lb-cropper>
  </section>
</template>

<script>
import api from '@/api/api';
import {mapGetters,mapActions} from 'vuex';
import LbCropper from '$offcom/cropper/lbCropper'
import LbVideoPlayer from '$offcom/tools/lbVideoPlayer'
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components:{
    LbCropper,
    LbVideoPlayer
  },
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
        imgArr :[],
        videoArr:[]
      },
      initImg:'static/img/img/up.png',
      dialogFormVisible : false,
      autoCropObj :{
        autoCropWidth : 690,
        autoCropHeight : 400
      },
      sizeObj :{
        '1':{
          autoCropWidth : 690,
          autoCropHeight : 400
        },
        '2':{
          autoCropWidth : 450,
          autoCropHeight : 260
        },
        '3':{
          autoCropWidth : 420,
          autoCropHeight : 350
        },
        '4':{
          autoCropWidth : 330,
          autoCropHeight : 260
        },
        '5':{
          autoCropWidth : 220,
          autoCropHeight : 220
        },
        '6':{
          autoCropWidth : 162,
          autoCropHeight : 162
        }
      },
      imgInd:0,
      type:'1',
      progress :0
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
    //选择图片类型
    imgTypeFn (num) {
      this.imgInd = 0;
      //样式
      this.obj.imgType = num;
      //数组赋值
      this.getNumArr(num);
      //当前图片尺寸
      this.autoCropObj = this.sizeObj[num];
    },
    //切换当前视频下标
    imgIndFn (ind) {
      this.imgInd = ind;
      if(!this.obj.videoArr[ind]){
        this.type ='1';
      } else{
        this.type = '3'
      }
    },
    //根据个数给数组赋值
    getNumArr (num) {
      let len = this.obj.imgArr.length;
         
      if(num >len){
        for(let i=0;i<num; i++){
          if(i+1 >len){
            this.obj.imgArr.push('');
            this.obj.videoArr.push('');
          }
        }
      } else {
        this.obj.imgArr.splice(num,len -num);
        this.obj.videoArr.splice(num,len-num);
      }
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
    //点击上传--格式判断
    uploadTeacherVideo(e){
      let inputDOM = this.$refs['teacherIntroductionVideo'];
      var file = e.target.files[0]
      if (!/\.(mp4|avi)$/.test(e.target.value)) {
        this.$message.error('视频类型必须是.mp4、.avi中的一种');
        return false
      }
      let formdata = new FormData();
      formdata.append('file',file);
      formdata.append('pid',1);
      formdata.append('platformId','20');

      this.saveAndGetFile(formdata);
       //重置value
      inputDOM.value = '';
    },
    //上传视频
    saveAndGetFile(formdata){
      this.type = '2';
      api.saveAndGetFile(formdata,{
        onUploadProgress: progressEvent => {
         this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0);
        }
      }).then((res)=>{
        if(res.code ==1){
          this.type='3';
          this.progress = 0;
          if(this.obj.videoArr.length ==0){
            this.obj.videoArr.push(res.data);
          } else{
            this.obj.videoArr.splice(this.imgInd,1,res.data);
          }
        }
      })
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
          background-image: url('/static/img/video/img1.png');
        }
      }
      &:last-child{
        div{
          background-image: url('/static/img/video/img2.png');
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

  .title-box{
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .lb-up-img-box{
    .up-box{
      &:first-child{
        margin-right: 20px;
      }
      &.up-box1{
        background-color: rgb(247,248,252);
        
        .video-icon{
          background: url('/static/img/video/video.png') no-repeat center;
          background-size: 100%;
          position:absolute;
          left: 50%;
          top: 50%;
          width: 50px;
          height: 50px;
          transform: translate(-50%,-50%);
        }
        .input-btn{
          position:absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: 0;
          z-index: 100;
        }
        .tiao-box{
          width: 100%;
          bottom: -14px;
          left: 0;
          position:absolute;
        }
      }
    }
  }
  .lb-video-wrap{
    position:absolute;
    left: 0;
    top:0;
    right:0;
    bottom:0;
    z-index:0;
  }
}
</style>

