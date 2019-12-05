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
            <i class="g-back" :style="'backgroundImage:url(static/img/title/'+m+')'"></i>
          </li>
        </ul>
      </el-col>
    </div>
    <section class="contact-main">
      <ul>
        <li 
          v-for="(m,i) in obj.bcardArr"
          :key="i"
        >
          <div class="g-cen-y box" v-if="!(i==0&&obj.bcardArr.length==1)">
            <p class="icon-box1">
              <span class="iconfont icon-up1" @click="clickBcardArrFn('up',i)" v-if="i!=0"></span>
              <span class="iconfont icon-down1" @click="clickBcardArrFn('down',i)" v-if="i!=obj.bcardArr.length-1"></span>
              <span class="iconfont icon-remove1" @click="clickBcardArrFn('remove',i)"></span>
            </p>
          </div>
          <div v-else style="padding-top:10px"></div>

          <div class="g-cen-y box">
            <el-col :span="5">名片信息：</el-col>
            <el-col :span="19">
              <el-col :span="15" class="inp" v-if="m.id">
                <el-input
                  placeholder="请输入内容"
                  v-model="m.name"
                  disabled>
                </el-input>
              </el-col>
              <el-col :span="8" >
                <el-button @click="showBusMemberFn(i)">{{!m.id?'选择成员':'重新选择'}}</el-button>
              </el-col>
            </el-col>
          </div>
          <div class="g-cen-y box">
            <el-col :span="7">是否跳转：</el-col>
            <el-col :span="17">
              <el-radio v-model="m.jumpIs" label="1">是<span style="color:#999">(可跳转到该成员名片)</span></el-radio>
              <el-radio v-model="m.jumpIs" label="0">否</el-radio>
            </el-col>
          </div>
        </li>
      </ul>
    </section>
    <div class="list-box">
      <el-button type="primary" @click="addBcardArrFn">添加名片</el-button>
    </div>
    <!-- 选择人员 -->
    <lb-member @handleChange="handleChange" ref="LbMemberId"/>
  </section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import LbMember from '$offcom/tools/lbMember'
export default {
  computed: {
    ...mapGetters(['pageArr','currentObj'])
  },
  components:{
    LbMember
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
      ind:0
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
    addBcardArrFn (num) {
      let obj = {
        id:'',
        jumpIs:'0',
        name:'姓名',
        position:'职位'
      };
      this.obj.bcardArr.push(obj);
    },
    //操作联系方式 --向上、向下、删除
    clickBcardArrFn (name,ind){
      if(name =='up'){
        let obj = this.obj.bcardArr[ind],
          obj1=this.obj.bcardArr[ind-1];
          this.obj.bcardArr.splice(ind-1,2,obj,obj1);
      }
      else if(name =='down'){
        let obj = this.obj.bcardArr[ind],
          obj1=this.obj.bcardArr[ind+1];
          this.obj.bcardArr.splice(ind,2,obj1,obj);
      }
      else if(name =='remove'){
        this.obj.bcardArr.splice(ind,1)
      }
    },
    //选择成员
    handleChange (arr) {
      let obj = JSON.parse(JSON.stringify(arr[arr.length-1]));
          obj.jumpIs =this.obj.bcardArr[this.ind].jumpIs;

      this.obj.bcardArr.splice(this.ind,1,obj);
    },
    //显示 --选择人员
    showBusMemberFn (ind){
      this.ind = ind;
      this.$refs.LbMemberId.init();
    }
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
        .inp{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
