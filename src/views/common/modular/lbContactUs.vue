<template>
  <section class="lb-contact-us-wrap">
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
            <i class="g-back" :style="'backgroundImage:url(static/img/title/'+m+')'"></i>
          </li>
        </ul>
      </el-col>
    </div>
    <section class="contact-main">
      <ul>
        <li 
          v-for="(m,i) in obj.infoArr"
          :key="i"
        >
          <div class="g-cen-y box">
            <p class="icon-box1">
              <span class="iconfont icon-up1" @click="clickInfoArrFn('up',i)" v-if="i!=0"></span>
              <span class="iconfont icon-down1" @click="clickInfoArrFn('down',i)" v-if="i!=obj.infoArr.length-1"></span>
              <span class="iconfont icon-remove1" @click="clickInfoArrFn('remove',i)"></span>
            </p>
          </div>
          <div class="g-cen-y box">
            <el-col :span="5">控件名称：</el-col>
            <el-col :span="19" class="lb-input-box">
              <el-input
                :placeholder="m.type==1?'公司地址':'联系电话'"
                v-model="m.title"
                width="100"
                maxlength ="15">
              </el-input>
              <span class="num g-cen-y">{{obj.title?obj.title.length:'0'}}/15</span>
            </el-col>
          </div>
          <div class="g-cen-y box" v-if="m.type ==1">
            <el-col :span="5">详细地址：</el-col>
            <el-col :span="19" class="lb-input-box">
              <el-col :span="24" class="inp" >
                <el-input
                  placeholder="请输入详细地址"
                  v-model="m.addressInfo"
                  maxlength ="30"
                  clearable
                  >
                </el-input>
              </el-col>
              <!-- <el-col :span="9" style="text-align:right">
                <el-button @click="popupMapInit(m,i)">重新定位</el-button>
              </el-col> -->
            </el-col>
          </div>
          <!-- <div class="g-cen-y box" v-if="m.type==1">
            <el-col :span="7">是否显示地图：</el-col>
            <el-col :span="17" class="lb-input-box">
              <el-radio v-model="m.enableIs" label="1">显示</el-radio>
              <el-radio v-model="m.enableIs" label="0">不显示</el-radio>
            </el-col>
          </div> -->
          <div class="g-cen-y box" v-if="m.type ==2">
            <el-col :span="5">联系电话：</el-col>
            <el-col :span="19" class="lb-input-box">
              <el-input
                placeholder="请输入电话"
                v-model="m.phone"
                width="100"
                maxlength ="15"
                clearable>
              </el-input>
            </el-col>
          </div>
        </li>
      </ul>
    </section>
    <div class="list-box">
      <el-button type="primary" @click="addInfoArrFn(1)">添加地址</el-button>
      <el-button type="primary" @click="addInfoArrFn(2)">添加电话</el-button>
    </div>
    <!-- 地图 -->
    <!-- <lb-popup-map ref="lbPopupMapId" /> -->
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import LbPopupMap from '$offcom/popup/lbPopupMap'
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components :{
    // LbPopupMap
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
      let logoUrl = 'static/img/title/'+name;
          Object.assign(this.obj,{logoUrl,logoCosid});
          this.setPageData(this.obj);
          this.obj.logoCosid = logoCosid;
    },
    //添加联系方式 -- 地址、电话
    addInfoArrFn (num) {
      let obj = {};
      if(num ==1){
        obj = {
          type :1,
          title:'公司地址',
          addressInfo:'请输入详细地址',
          enableIs:'0'
        }
      } else {
        obj = {
          type :2,
          title:'联系电话',
          phone:'0755-XXXXXXXXXX'
        }
      }
      this.obj.infoArr.push(obj);
    },
    //操作联系方式 --向上、向下、删除
    clickInfoArrFn (name,ind){
      if(name =='up'){
        let obj = this.obj.infoArr[ind],
          obj1=this.obj.infoArr[ind-1];
          this.obj.infoArr.splice(ind-1,2,obj,obj1);
      }
      else if(name =='down'){
        let obj = this.obj.infoArr[ind],
          obj1=this.obj.infoArr[ind+1];
          this.obj.infoArr.splice(ind,2,obj1,obj);
      }
      else if(name =='remove'){
        this.obj.infoArr.splice(ind,1)
      }
    },
    //打开地图--去定位
    popupMapInit (obj) {

      this.$refs.lbPopupMapId.init(obj.addressInfo);
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.lb-contact-us-wrap{
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
          height: 50px;
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
      }
    }
  }
}
</style>
