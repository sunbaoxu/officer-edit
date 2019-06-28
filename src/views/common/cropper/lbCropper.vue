<template>
  <el-dialog 
    title="上传" 
    :visible.sync="dialogFormVisible" 
    class="lb-cropper-wrap" 
    width="790px"
    :closeOnClickModal="false"
    :append-to-body="async"
  >
    <section class="lb-cropper-main" v-if="dialogFormVisible">
      <p class="tips-box g-cen-y"><i class="iconfont icon-tips"></i>图片建议尺寸：{{option.autoCropWidth}}*{{option.autoCropHeight}}，宽高均小于4000，大小2M以内，类型必须是.gif,jpeg,jpg,png,bmp中的一种。</p>
      <section class="lb-cropper-box">
        <div class="lef list-box">
          <h4 class="title">裁剪操作框</h4>
          <div class="img-box g-cen-cen cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :canScale="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
            ></vueCropper>
          </div>
          <div class="footer-box">
            <p class="g-cen-cen">
              <span>上传</span>
              <i class="iconfont icon-upload"></i>
              <input type="file"  @change="uploadImg($event, 1)">
            </p>
            <span class="g-cen-cen" @click="changeScale(1)"><i class="iconfont icon-add"></i></span>
            <span class="g-cen-cen" @click="changeScale(-1)"><i class="iconfont icon-jian"></i></span>
            <span class="g-cen-cen" @click="rotateLeft"><i class="iconfont icon-fan"></i></span>
            <span class="g-cen-cen" @click="rotateRight"><i class="iconfont icon-zheng"></i></span>
          </div>
        </div>
        <div class="rig list-box">
          <h4 class="title">裁剪预览框</h4>
          <div 
            class="img-box g-cen-cen"
            :class="{'on':previews.url}"
          >
            <p v-if="!previews.url">请选择图片后预览哦</p>
            <div v-else :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
 
          </div>
          <!-- 确定 -->
          <div class="footer-box">
            <el-button type="primary" :loading="btnAsync" @click="uploadAvatar">确 定</el-button>
            
          </div>
        </div>
      </section>
    </section>
  </el-dialog>
</template>

<script>
import {VueCropper} from 'vue-cropper';
import api from '@/api/api';
// import globalFn from '@/assets/javascripts/globalFn'
export default {
  props:{
    async :{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      dialogFormVisible:false,
      option: {}, 
      previews :{},
      btnAsync:false
    }
  },
  components: { 
    VueCropper 
  },
  methods : {
    init (obj) {
      let num = obj.autoCropWidth > 360 ?360 /obj.autoCropWidth:1;
      this.option ={
        img: "",
        size: 1,
        full: true,
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        high: true,
        autoCropWidth: obj.autoCropWidth*num,
        autoCropHeight: obj.autoCropHeight*num,
        fixedBox: false,//截图框是否可变
        infoTrue: false,
        downImg: "#"
      }

      this.dialogFormVisible = true;
    },
    // 实时预览函数 
    realTime(data) { 
      this.previews = data 
    }, 
    //放大/缩小
    changeScale(num) { 
      num = num || 1; 
      this.$refs.cropper.changeScale(num); 
    }, 
    //坐旋转
    rotateLeft() { 
      this.$refs.cropper.rotateLeft(); 
    }, 
    //右旋转
    rotateRight() { 
      this.$refs.cropper.rotateRight(); 
    }, 
    //选择本地图片
    uploadImg(e, num) { 
      var _this = this;
      //上传图片 
      var file = e.target.files[0] 
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
        return false 
      } 
      var reader = new FileReader(); 
      reader.onload =(e) => { 
        let data; 
        if (typeof e.target.result === 'object') { 
          // 把Array Buffer转化为blob 如果是base64不需要 
          data = window.URL.createObjectURL(new Blob([e.target.result])) 
        } 
        else { 
          data = e.target.result 
        }
        if (num === 1) { 
          _this.option.img = data ;
        } else if (num === 2) { 
          _this.example2.img = data 
        } 
      } 
      // 转化为base64 
      reader.readAsDataURL(file) 
      // 转化为blob 
      // reader.readAsArrayBuffer(file);
      
    }, 
    //确定剪切
    uploadAvatar () {
      if(this.option.img){
        this.btnAsync =true;
      } else{
        return false;
      }
      this.$refs.cropper.getCropData((data) => {
        this.img= data;
        let obj={
          // "pid":JSON.parse(globalFn.getCookieFn('lb-tuitui-jgpt-obj')).pid,//用户ID，必传
          "platformId":20, //平台ID，必传
          "remark":"" ,//文件备注信息
          "file": data ,//文件数据，必传
          "fileName": this.fileName ,//文件名称，必传
          "permission":1 
        }
        api.uploadAvatar(obj).then((res)=>{
          if(res.code ==1){
            this.$emit('uploadAvatar',res.data);
            this.initDataFn();
          } else{
            this.btnAsync = false;
          }
        })
      })
    },
    //重置数据
    initDataFn () {
      this.btnAsync = false;
      if(this.option.image) {
        this.$refs['cropper'].imgs = "";
      }
      this.option = {};
      this.previews={};
      this.dialogFormVisible=false;
    }
  }
}
</script>
<style lang="scss" scoped>
.lb-cropper-main{
  .tips-box{
    color: orangered;
    font-size: 12px;
    i{
      font-size: 20px;
      margin-right: 5px;
    }
  }
}
.lb-cropper-box{
  display: flex;
  .list-box{
    width: 0;
    flex:1;
    &>.title{
      line-height: 40px;
      font-size: 16px;
    }
    &>.img-box{
      background: #eee;
      width: 360px;
      height: 360px;
      &.on{
        background: transparent;
      }
      .preview{
        overflow: hidden;
        background: #eee;
      }
    }
    .footer-box{
      padding-top: 20px;
    }
  }
  .lef{
    .footer-box{
      display: flex;
      justify-content: space-around;
      &>p{
        background:  #409EFF;
        color: #fff;
        border-radius: 4px;
        height: 40px;
        padding:0 24px;
        position: relative;
        overflow: hidden;
        i{
          font-size: 20px;
          margin-left: 4px;
        }
        input{
          position:absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
        }
      }
      &>span{
        border:1px solid #ececec;
        border-radius: 4px;
        height: 40px;
        width: 52px;
      }
    }
  }
  .rig{
    .footer-box{
      display: flex;
      justify-content: flex-end;
      padding-right: 14px;
    }
  }
}

</style>

<style lang="scss">
.lb-cropper-wrap{
  .el-dialog__header{
    border-bottom: 1px solid #ececec;
  }
}
</style>
