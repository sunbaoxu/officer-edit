<template>
  <section class="lb-img-wrap">
    <!-- 样式选择 -->
    <div class="list-box">
      <h4 class="title">
        <span>样式选择:</span>
        <span>(切换样式将导致当前的内容丢失)</span>
      </h4>
      <ul class="img-ul-box">
        <li 
          v-for="(m,i) in 4" 
          :key="i" 
          :class="{'on':obj.itType == m}"
          class="type-li"
          @click="itTypeFn('itType',m)"
        >
          <div class="g-back"></div>
          <p v-if="m==1">单图文</p>
          <p v-else-if="m==2">列表图文</p>
          <p v-else-if="m==3">滑块图文</p>
          <p v-else-if="m==4">宫格图文</p>
        </li>
      </ul>
    </div>
    <!-- 文字位置 -->
    <div class="list-box" v-if="obj.itType=='1'||obj.itType=='2'">
      <h4 class="title">
        <span>文字位置:</span>
        <span></span>
      </h4>
      <ul class="img-ul-box">
        <li 
          v-for="(m,i) in 4" 
          :key="i" 
          :class="['img'+m,{'on':obj.structure == m}]"
          @click="itTypeFn('structure',m)"
          class="pos-li"
          v-show="(obj.itType==1&& i<2) || (obj.itType==2 && i>1)"
        >
          <div class="g-back"></div>
          <p v-if="m==1">上图下文</p>
          <p v-else-if="m==2">上文下图</p>
          <p v-else-if="m==3">左图右文</p>
          <p v-else-if="m==4">左文右图</p>
        </li>
      </ul>
    </div>
    <div class="list-box">
      <h4 class="title">
        <span>图片编辑:</span>
        <span>(图片大小不超过2M,支持jpg、png格式{{obj.itType == '1'||'，最多可上传10张'}})</span>
      </h4>
      <section class="lb-add-img-box" v-if="obj.itType !='1'">
        <!-- 显示列数 -->
        <section class="radio-box g-cen-y" v-if="obj.itType == '3'">
          <div class="title">显示完整列表：</div>
          <div class="radio-div">
            <el-radio v-model="obj.radio" label="1">1列</el-radio>
            <el-radio v-model="obj.radio" label="2">2列</el-radio>
          </div>
        </section>
        <!-- 显示行、列 -->
        <section class="input-num-box" v-if="obj.itType == '4'">
          <el-col :span="10">
            <span>行数：</span>
            <el-input-number size="mini" v-model="obj.maxRowNum" controls-position="right" @change="handleChange('maxRowNum')" :min="1" :max="4"></el-input-number>
          </el-col>
          <el-col  :span="10">
            <span>列数：</span>
            <el-input-number size="mini" v-model="obj.maxColumnNum" controls-position="right" @change="handleChange('maxColumnNum')" :min="2" :max="4"></el-input-number>
          </el-col>
        </section>
        <!-- 添加图片 -->
        <ul class="img-ul">
          <li 
            class="g-back" 
            :style="'backgroundImage:url('+(obj.detailsArr[i] && obj.detailsArr[i].imgObj?obj.detailsArr[i].imgObj.thumUrl:initImg)+')'"
            v-for="(m,i) in obj.detailsArr"
            :key="i"
            :class="{'on':imgInd == i}"
            @click="switchImgFn(i)"
          >
            <i 
              class="iconfont icon-remove remove" 
              v-if="(obj.itType =='2' && i>1) || obj.itType =='3' && i>2" 
              @click.stop="removeFn(i)"
            ></i>
          </li>

          <li 
            class="add-li g-cen-cen" 
            @click="addImgFn"
            v-if="(obj.itType == '2' ||obj.itType == '3') && obj.detailsArr.length<10"
          >
            <i class="iconfont icon-add add"></i></li>
        </ul>
      </section>
      <!-- 上传图片 -->
      <section class="lb-up-img-box" v-if="obj.detailsArr[imgInd]">
        <div 
          class="up-box g-back" 
          :style="'backgroundImage:url('+(obj.detailsArr[imgInd].imgObj?obj.detailsArr[imgInd].imgObj.thumUrl:initImg)+')'" 
          @click="lbCropperOpen"
        >
          <span v-if="!obj.detailsArr[imgInd].imgObj">上传图片</span>
          <div class="back-box g-cen-cen">
            <i class="iconfont icon-up-img"></i><span>上传图片</span>
          </div>
        </div>
        <p>最佳尺寸：{{autoCropObj.autoCropWidth}}*{{autoCropObj.autoCropHeight}}px</p>
      </section>
      <!-- 标题 -->
      <section class="lb-img-title-wrap" v-if="titleObj.align">
        <div class="g-cen-y title-box check-box">
          <el-col :span="4">内容设置：</el-col>
          <el-col :span="16" class="">
            <el-checkbox v-model="titleObj.mainTitleAsync">主标题</el-checkbox>
            <el-checkbox v-model="titleObj.subheadingAsync">副标题</el-checkbox>
            <el-checkbox v-model="titleObj.contentAsync" v-if="obj.itType !='2'">介绍</el-checkbox>
          </el-col>
        </div>
        <!-- 文字位置 -->
        <div class="g-cen-y title-box check-box" v-if="obj.itType == '1'">
          <el-col :span="4">文字位置：</el-col>
          <el-col :span="16" class="">
            <el-radio v-model="titleObj.align" label="1">左侧对齐</el-radio>
            <el-radio v-model="titleObj.align" label="2">水平居中</el-radio>
          </el-col>
        </div>
        <div class="g-cen-y title-box" v-if="titleObj.mainTitleAsync">
          <el-col :span="4">主标题：</el-col>
          <el-col :span="16" class="lb-input-box">
            <el-input
              placeholder="请输入内容"
              v-model="titleObj.mainTitle"
              width="100"
              maxlength ="20">
            </el-input>
            <span class="num g-cen-y">{{titleObj.mainTitle?titleObj.mainTitle.length:'0'}}/20</span>
          </el-col>
        </div>
        <div class="g-cen-y title-box" v-if="titleObj.subheadingAsync">
          <el-col :span="4">副标题：</el-col>
          <el-col :span="16" class="lb-input-box">
            <el-input
              placeholder="请输入内容"
              v-model="titleObj.subheading"
              width="100"
              maxlength ="50">
            </el-input>
            <span class="num g-cen-y">{{titleObj.subheading?titleObj.subheading.length:'0'}}/50</span>
          </el-col>
        </div>
        <div class="title-box" v-if="titleObj.contentAsync && obj.itType !='2'">
          <el-col :span="4" class="title">内容：</el-col>
          <el-col :span="16" class="lb-textarea-box">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="titleObj.content"
              :rows="4"
              maxlength ="100">
            </el-input>
            <span class="num g-cen-y">{{titleObj.content?titleObj.content.length:'0'}}/100</span>
          </el-col>
        </div>
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
      this.setPageData(newObj);
    },
    titleObj (newObj,oldTitle) {
      this.obj.detailsArr.splice(this.imgInd,1,newObj);
    },
    currentObj (){
      this.init()
    }
  },
  data () {
    return {
      obj : {
        detailsArr :[]
      },
      initImg:'~@/assets/img/img/up.png',
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
          autoCropWidth : 188,
          autoCropHeight : 148
        },
        '3':{
          autoCropWidth : 450,
          autoCropHeight : 260
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
      titleObj : {},
      titleInitObj:{
        'mainTitle' : '主标题' ,
        'mainTitleAsync' :true,
        'subheading' : '副标题' ,
        'subheadingAsync':true,
        'content' : '' ,
        'contentAsync':true,
        'align' : '1',
        'imgObj':''
      }
    }
  },
  methods : {
    ...mapActions(['setPageArr']),
    init () {
      this.pageArr.map((m,i)=>{
        if(m.id == this.currentObj.id){
          this.obj =m;
          this.imgIndFn();
        }
      });
    },
    //当前下标下--是否有值
    imgIndFn (){
      if(!this.obj.detailsArr[this.imgInd]){
        this.titleObj = this.copyObjFn(this.titleInitObj);
      } else{
        this.titleObj = this.copyObjFn(this.obj.detailsArr[this.imgInd]);
      }
    },
    //动态设置属性
    setPageData (newObj) {
      this.setPageArr({obj:newObj,id:this.currentObj.id});
    },
    //选择图片类型
    itTypeFn (name,num) {
      this.obj[name] = num;
      if(name !='itType'){return false};
      if(num==2){
        this.obj.structure = '3'
      } else if(num ==1){
        this.obj.structure = '1'
      }

      //切换图片
      this.switchImgFn(0)
      //根据个数给数组赋值
      this.getNumArr(num);
      this.autoCropObj = this.sizeObj[num];
      if(num==4){
        this.obj.maxRowNum =2;
        this.obj.maxColumnNum =2;
      }
    },
    //改变图片个数  --宫格图
    handleChange (val,l){
      let num = this.obj.maxRowNum *      this.obj.maxColumnNum;
      this.autoCropObj = this.sizeObj[this.obj.maxColumnNum+2];
      this.getNumArr(num);    
    },
    //添加图片数组
    addImgFn () {
      this.obj.detailsArr.push(this.copyObjFn(this.titleInitObj));
    },
    //根据个数给数组赋值
    getNumArr (num) {
      let len = this.obj.detailsArr.length;
         
      if(num >len){
        for(let i=0;i<num; i++){
          if(i+1 >len){
            //添加图片数组
            this.addImgFn();
          }
        }
      } else {
        this.obj.detailsArr.splice(num,len -num)
      }
    },
    //打开上传图片--组件
    lbCropperOpen () {
      this.$refs.lbCropperId.init(this.autoCropObj)
    },
    //上传图片成功
    uploadAvatar (obj) {
      let newObj = this.obj.detailsArr[this.imgInd];
          newObj['imgObj'] = obj;
          this.obj.detailsArr.splice(this.imgInd,1,newObj);
    },
    //删除图片
    removeFn (num) {
      this.obj.detailsArr.splice(num,1);
    },
    //切换图片 
    switchImgFn (ind) {
      this.imgInd = ind;
      this.titleObj = this.copyObjFn(this.obj.detailsArr[this.imgInd])
    },
    //重新赋值
    copyObjFn (obj) {
      return JSON.parse(JSON.stringify(obj))
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
      &.type-li{
        &:nth-child(1){
          div{
            background-image: url('~@/assets/img/imgText/img1.png');
          }
        }
        &:nth-child(2){
          div{
            background-image: url('~@/assets/img/imgText/img2.png');
          }
        }
        &:nth-child(3){
          div{
            background-image: url('~@/assets/img/imgText/img3.png');
          }
        }
        &:last-child{
          div{
            background-image: url('~@/assets/img/imgText/img4.png');
          }
        }
        &:hover{
          &:nth-child(3){
            div{
              background-image: url('~@/assets/img/imgText/img3.png');
              // background-position: center -2px;
            }
          }
        }
      }
      &.pos-li{
        &.img1{
          div{
            background-image: url('~@/assets/img/imgText/img-1.png');
          }
        }
        &.img2{
          div{
            background-image: url('~@/assets/img/imgText/img-2.png');
          }
        }
        &.img3{
          div{
            background-image: url('~@/assets/img/imgText/img-3.png');
          }
        }
        &.img4{
          div{
            background-image: url('~@/assets/img/imgText/img-4.png');
          }
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
.lb-img-title-wrap{
  padding-top: 10px;
  .title-box{
    padding-bottom: 10px;
  }
  .check-box{
    height: 40px;
  }
}
</style>

