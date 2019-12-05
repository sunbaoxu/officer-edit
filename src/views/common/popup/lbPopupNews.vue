<template>
  <el-dialog 
    title="添加资讯"
    :visible.sync="dialogFormVisible" 
    class="lb-popup-news-wrap" 
    width="790px"
    :closeOnClickModal="false"
  >
    <section class="main-box">
      <div class="g-cen-y list-box">
        <el-col :span="3" class="title"><span>*</span>资讯标题：</el-col>
        <el-col :span="14" class="lb-input-box">
          <el-input
            placeholder="请输入内容"
            v-model="obj.title"
            width="100"
            maxlength ="30">
          </el-input>
          <span class="num g-cen-y">{{obj.title?obj.title.length:'0'}}/30</span>
        </el-col>
      </div>
      <div class="list-box img-list-box">
        <el-col :span="3" class="title">封面图片：</el-col>
        <el-col :span="14" class="lb-input-box">
          <!-- 上传图片 -->
          <section class="lb-up-img-box">
            <div 
              class="up-box g-back" 
              :style="'backgroundImage:url('+(obj.coverImage ?obj.coverImage :initImg)+')'" 
              @click="lbCropperOpen"
            >
              <span v-if="!obj.coverImage">上传图片</span>
              <div class="back-box g-cen-cen">
                <i class="iconfont icon-up-img"></i><span>上传图片</span>
              </div>
            </div>
            <p>最佳尺寸：188*148px</p>
          </section>
        </el-col>
      </div>
      <div class="list-box">
        <el-col :span="3" class="title"><span>*</span>详细内容：</el-col>
        <el-col :span="20" class="lb-input-box">
          <quill-editor 
            v-model="obj.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </el-col>
      </div>
      <div class="footer-box">
            <el-button type="primary" :loading="btnAsync" @click="addOrUpdateWebsiteNews">确定添加</el-button>
            
          </div>
    </section>
    <!-- 上传图片 -->
    <lb-cropper ref="lbCropperId" @uploadAvatar="uploadAvatar" :async="true"></lb-cropper>
  </el-dialog>
</template>

<script>
import api from '@/api/api';
 import { quillEditor } from 'vue-quill-editor'
import LbCropper from '$offcom/cropper/lbCropper'
// import globalFn from '@/assets/javascripts/globalFn'
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['midObj'])
  },
  data () {
    return {
      initImg:'static/img/img/up.png',
      btnAsync : false,
      dialogFormVisible :false,
      type:'2',
      obj:{},
      content:null,
      editorOption:{
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
        
            [{
              'header': 1
            }, {
              'header': 2
            }], 
            [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }],
            [{
              'script': 'sub'
            }, {
              'script': 'super'
            }], 
            [{
              'indent': '-1'
            }, {
              'indent': '+1'
            }], 
            [{
              'direction': 'rtl'
            }],
            [{
              'color': []
            }, {
              'background': []
            }], 
            [{
              'align': []
            }],
            ['image']
          ]
        }
      }
 
    }
  },
  components: { 
    LbCropper 
  },
  methods : {
    init(obj) {
      this.dialogFormVisible = true;
      this.obj = obj;
      if(obj.content){
        this.ajaxFn(obj.content);
      }
    },
    onEditorBlur(e){//失去焦点事件
      // console.log(e,'失去焦点');
    },
    onEditorFocus(e){//获得焦点事件
      // console.log(e,'获得焦点');
    },
    onEditorChange(e){//内容改变事件
      // console.log(e,'改变内容');
    },
    //打开上传图片--组件
    lbCropperOpen () {
      this.$refs.lbCropperId.init({
        autoCropWidth : 188,
        autoCropHeight : 148
      })
    },
    //上传图片成功
    uploadAvatar (obj) {
      this.obj.coverImage = obj.thumUrl;
    },
    //新增或者修改企业资讯信息
    addOrUpdateWebsiteNews(){
      this.obj.mid = this.midObj.mid; 
      this.btnAsync = true;
      api.addOrUpdateWebsiteNews(this.obj).then((res)=>{
        this.btnAsync = false;
        if(res.code ==1){
          this.$emit('clickPopupNewsFn');
          this.dialogFormVisible= false;
          this.obj = {};
        }
      });
    },
    ajaxFn (url) {
      var xmlhttp;    
      if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
      }
      else{
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange=()=>{
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
          this.obj.content = xmlhttp.responseText;
        }
      }
      xmlhttp.open("get",url);
      xmlhttp.send();
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.lb-popup-news-wrap{
  .main-box{
    padding:20px 30px;
    .list-box{
      padding-bottom: 10px;
      overflow: hidden;
      .title{
        text-align: right;
        span{
          color: red;
          margin-right: 4px;
        }
      }
    }
    .img-list-box{
      padding-bottom: 30px;
    }
  }
  .lb-up-img-box{
    .up-box{
      width: 188px;
      height: 148px;
    }
  }
  .footer-box{
    text-align: center;
  }
}


</style>
<style lang="scss">
.lb-popup-news-wrap{
  .el-dialog__header{
    border-bottom: 1px solid #ececec;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
  .ql-container {
    .ql-editor{
      min-height:240px;
      max-height:360px;
      overflow-y:auto;
    }
  }
}
</style>

