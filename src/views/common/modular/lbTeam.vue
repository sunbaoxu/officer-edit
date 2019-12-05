<template>
  <section class="lb-bus-card-wrap">
    <div class="g-cen-y list-box">
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
    <div class="icon-box list-box">
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
            <i class="g-back" :style="'backgroundImage:url(~@/assets/img/title/'+m+')'"></i>
          </li>
        </ul>
      </el-col>
    </div>
    <section class="contact-main">
      <ul>
        <li 
          v-for="(m,i) in obj.userArr"
          :key="i"
        >
          <div class="g-cen-y box box1" v-if="!(i==0&&obj.userArr.length==1)">
            <p class="icon-box1">
              <span class="iconfont icon-up1" @click="clickUserArrFn('up',i)" v-if="i!=0"></span>
              <span class="iconfont icon-down1" @click="clickUserArrFn('down',i)" v-if="i!=obj.userArr.length-1"></span>
              <span class="iconfont icon-remove1" @click="clickUserArrFn('remove',i)"></span>
            </p>
          </div>
          <div v-else style="padding-top:10px"></div>
          <!-- 上传图片 -->
          <div class="box">
            <el-col :span="5">头像：</el-col>
            <el-col :span="19" class="lb-input-box">
              <section class="lb-up-img-box">
                <div 
                  class="up-box g-back" 
                  :style="'backgroundImage:url('+(m.imgObj?m.imgObj.thumUrl:initImg)+')'" 
                  @click="lbCropperOpen(i)"
                >
                  <span v-if="!m.imgObj">上传图片</span>
                  <div class="back-box g-cen-cen">
                    <i class="iconfont icon-up-img"></i><span>上传图片</span>
                  </div>
                </div>
                <p>最佳尺寸：330*280px</p>
              </section>
            </el-col>
          </div>
          <!-- 姓名 -->
          <div class="g-cen-y box">
            <el-col :span="5">姓名：</el-col>
            <el-col :span="19" class="lb-input-box">
              <el-input
                placeholder="请输入内容"
                v-model="m.teamName"
                width="100"
                maxlength ="20">
              </el-input>
              <span class="num g-cen-y">{{m.teamName?m.teamName.length:'0'}}/20</span>
            </el-col>
          </div>
          <!-- 职位 -->
          <div class="g-cen-y box">
            <el-col :span="5">职位：</el-col>
            <el-col :span="19" class="lb-input-box">
              <el-input
                placeholder="请输入内容"
                v-model="m.job"
                width="100"
                maxlength ="20">
              </el-input>
              <span class="num g-cen-y">{{m.job?m.job.length:'0'}}/20</span>
            </el-col>
          </div>
          <!-- 简介 -->
          <div class="box">
            <el-col :span="5">简介：</el-col>
            <el-col :span="19" class="lb-textarea-box">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="m.info"
                :rows="4"
                maxlength ="1000">
              </el-input>
              <span class="num g-cen-y">{{m.info?m.info.length:'0'}}/1000</span>
            </el-col>
          </div>
          <div class="g-cen-y box">
            <el-col :span="7">是否跳转名片：</el-col>
            <el-col :span="17">
              <el-radio v-model="m.jumpIs" label="0">否</el-radio>
              <el-radio v-model="m.jumpIs" label="1">跳转到成员名片</el-radio>
            </el-col>
          </div>
          <div class="g-cen-y box" v-if="m.jumpIs == '1'">
            <el-col :span="5"></el-col>
            <el-col :span="19">
              <el-col :span="15" class="inp">
                <el-input
                  placeholder="请输入内容"
                  v-model="m.cardObj.name"
                  disabled>
                </el-input>
              </el-col>
              <el-col :span="8" >
                <el-button @click="showBusMemberFn(i)">{{!m.cardObj.id?'关联成员':'重新关联'}}</el-button>
              </el-col>
            </el-col>
          </div>
        </li>
      </ul>
    </section>
    <div class="list-box">
      <el-button type="primary" @click="addUserArrFn">添加人员</el-button>
    </div>
    <!-- 选择人员 -->
    <lb-member @handleChange="handleChange" ref="LbMemberId"/>
    <!-- 上传图片 -->
    <lb-cropper ref="lbCropperId" @uploadAvatar="uploadAvatar"></lb-cropper>
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import LbMember from '$offcom/tools/lbMember'
import LbCropper from '$offcom/cropper/lbCropper'
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components:{
    LbMember,
    LbCropper
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
      obj :{},
      ind:0,
      initImg:'~@/assets/img/img/up.png',
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
      let logoUrl = '~@/assets/img/title/'+name;
          Object.assign(this.obj,{logoUrl,logoCosid});
          this.setPageData(this.obj);
          this.obj.logoCosid = logoCosid;
    },
    //添加联系方式 -- 地址、电话
    addUserArrFn (num) {
      let obj = {
        "teamName":'姓名',
        "job":'职位',
        "info":'内容',
        "jumpIs":'0',
        'cardObj':{}
      };
      this.obj.userArr.push(obj);
    },
    //操作联系方式 --向上、向下、删除
    clickUserArrFn (name,ind){
      if(name =='up'){
        let obj = this.obj.userArr[ind],
          obj1=this.obj.userArr[ind-1];
          this.obj.userArr.splice(ind-1,2,obj,obj1);
      }
      else if(name =='down'){
        let obj = this.obj.userArr[ind],
          obj1=this.obj.userArr[ind+1];
          this.obj.userArr.splice(ind,2,obj1,obj);
      }
      else if(name =='remove'){
        this.obj.userArr.splice(ind,1)
      }
    },
    //选择成员
    handleChange (arr) {
      let obj = JSON.parse(JSON.stringify(arr[arr.length-1])),
          obj1= JSON.parse(JSON.stringify(this.obj.userArr[this.ind]));
          obj1.cardObj = obj;
      this.obj.userArr.splice(this.ind,1,obj1);
    },
    //显示 --选择人员
    showBusMemberFn (ind){
      this.ind = ind;
      this.$refs.LbMemberId.init();
    },
    //打开上传图片--组件
    lbCropperOpen (ind) {
      this.ind = ind;
      this.$refs.lbCropperId.init({
        autoCropWidth : 330,
        autoCropHeight : 280
      })
    },
    //上传图片成功
    uploadAvatar (obj) {
      let obj1= JSON.parse(JSON.stringify(this.obj.userArr[this.ind]));
          obj1.imgObj = obj;
          this.obj.userArr.splice(this.ind,1,obj1);
    },
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.lb-bus-card-wrap{
  padding-top: 10px;
  .list-box{
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
  .contact-main{
    padding-left: 15px;
    ul{
      li{
        width: 400px;
        background: #eee;
        margin-bottom: 10px;
        padding:15px 10px;
        border-radius: 6px;
        border:1px solid #e2e2e2;
        &>.box{
          padding-bottom: 20px;
          width: 100%;
          overflow: hidden;
          &.box1{
            padding-bottom: 0;
          }
          .icon-box1{
            display: flex;
            height: 50px;
            justify-content: flex-end;
            width: 100%;
            align-items: center;
            span{
              font-size: 28px; 
              margin-left: 8px;
              color: #666;
            }
            span:hover{
              color: #409EFF;
            }
          }
        }
        .inp{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
