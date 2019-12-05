<template>
  <section class="lb-title-wrap">
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
      <el-col :span="4" class="title">选择图标：</el-col>
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
    <div class="g-cen-y list-box" v-if="recruitArr.length >0">
      <el-col :span="4">资讯列表：</el-col>
      <el-col :span="16" class="lb-input-box"></el-col>
    </div>
    <section class="recruit-main" v-if="recruitArr.length >0">
      <ul>
        <li class="list-box-li g-cen-y">
          <span class="con1">招聘职位</span>
          <span class="con2">职位薪资</span>
          <span class="con3">经验要求</span>
          <span class="con4">状态</span>
          <span class="con5">操作</span>
        </li>
        <li
          v-for="(m,i) in recruitArr"
          :key="i"
          class="g-cen-y con-box-li"
        >
          <div class="con1 con-p3 con-p1"><p class="g-text-ove2">{{m.name}}</p></div>
          <p class="con2 con-p2">{{m.salary}}</p>
          <p class="con3 con-p3">{{m.experience}}</p>
          <p class="con4 g-cen-cen">
            <el-switch
              v-model="m.async"
              @change="changeSwitch(m,i)"
            >
            </el-switch>
          </p>
          <p class="con5 con-p5 g-cen-cen">
            <span class="g-cen-cen" @click="addPopupRecruitFn(m,i)"><i class="iconfont icon-xiugai"></i></span>
            <span class="g-cen-cen" @click="removeInfoArrFn(i)"><i class="iconfont icon-shanchu"></i></span>
          </p>
        </li>
      </ul>
    </section>
    <div class="list-box padd">
      <el-button type="primary" @click="addPopupRecruitFn('')">添加招聘</el-button>
    </div>
    <!-- 添加资讯 -->
    <lb-popup-recruit ref="lbPopupRecruitId" @clickPopupRecruitFn="getRecruitmentInfoList" />
  </section>
</template>

<script>
import api from '@/api/api';
import {mapGetters,mapActions} from 'vuex';
import lbPopupRecruit from '$offcom/popup/lbPopupRecruit';

export default {
  computed: {
    ...mapGetters(['pageArr','currentObj','midObj'])
  },
  components:{lbPopupRecruit},
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
      initImg:'~@/assets/img/img/up.png',
      ind:'',
      recruitArr:[]

    }
  },
  methods : {
    ...mapActions(['setPageArr']),
    init () {

      
      this.getRecruitmentInfoList();

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
    //添加、新增 资讯
    addPopupRecruitFn (obj,ind) {
      if(ind){this.ind = ind};
      this.$refs.lbPopupRecruitId.init(obj);
    },
    //删除当前资讯
    removeInfoArrFn (ind){
      this.$confirm('该资讯信息将立即被删除，删除后无法恢复！是否确认删除?', '确认删除？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ind = ind;
          this.deleteRecruitmentInfo();
        })
    },
    //获取企业资讯信息列表
    getRecruitmentInfoList () {
      let obj = {
        mid:this.midObj.mid
      }
      api.getRecruitmentInfoList(obj).then((res)=>{
        if(res.code == 1){
          this.recruitArr = res.data;
          let arr = [];
          this.recruitArr.map((m,i)=>{
            this.obj.infoObjIdArr.map((n,ind)=>{
              if(n.id == m.id){
                m.async = true;
                arr.push(m);
              }
            });
          });

          this.obj.infoObjIdArr = arr;
        }
      })
    },
    //删除企业资讯信息
    deleteRecruitmentInfo () {

      let id = this.recruitArr[this.ind].id;
      api.deleteRecruitmentInfo({id}).then((res)=>{
        if(res.code ==1){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.deleteRecruitArr()
        }
      })
    },
    //是否选中资讯
    changeSwitch (m,ind) {
      if(m.async){
        this.obj.infoObjIdArr.push(JSON.parse(JSON.stringify(m)))
      } else{
        let index ='null';

        this.obj.infoObjIdArr.map((m,i)=>{
          if(m.id == this.recruitArr[ind].id){
            index = i;
          }
        });
        if(index!='null'){
          this.obj.infoObjIdArr.splice(index,1);

          let obj = JSON.parse(JSON.stringify(this.recruitArr[ind]));
              obj.async = false;
          this.recruitArr.splice(ind,1,obj);
        }
      }
    },
    //删除所有资讯 
    deleteRecruitArr () {
      this.pageArr.map((m,i)=>{
        if(m.type == '20002'){
          m.infoObjIdArr.map((n,ind)=>{
            if(n.id == this.recruitArr[this.ind].id){
              m.infoObjIdArr.splice(ind,1)
            }
          });
        }
      });
      this.ind = '';
      this.getRecruitmentInfoList();
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.lb-title-wrap{
  padding-top: 10px;
  .list-box{
    padding-left: 15px;
    overflow: hidden;
    &.padd{
      padding-top: 20px;
    }
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

  .recruit-main{
    padding:10px 30px 0;
    ul{
      border:1px solid #ececec;
      border-radius: 6px;
      color: #999;
      li{
        border-bottom: 1px solid #ececec;
        text-align: center;
        min-height: 60px;
      }
      .list-box-li{
        font-size: 12px;
        max-height: 50px;
        min-height: 50px;
      }
      .con-box-li:hover{
        background: #f6f8fb;
      }
      .con-box-li{
        &:last-child{
          border-bottom: 0;
        }
      }
      .con1{
        width: 0;
        flex:1;
        &.con-p1{
          text-align: initial;
          padding:4px 10px;
          p{
            -webkit-line-clamp: 4;
            word-wrap:break-word;
          }
        }
      }
      .con2{
        width: 60px;
        &.con-p2{
          span{
            width: 38px;
            height: 30px;
          }
        }
      }
      .con3{
        width: 96px;
        &.con-p3{
          font-size: 12px;
        }
      }
      .con4{
        width: 44px;
      }
      .con5{
        width: 110px;
        &.con-p5{
          span{
            height: 28px;
            border:1px solid #ececec;
            width: 46px;
            &:first-child{
              border-right: 0;
              border-radius: 4px 0 0 4px;
            }
            &:last-child{
              border-radius: 0 4px 4px 0;
            }
          }
          span:hover{
            background: #e4eef9;
            border-color: #9dccfd;
            &+span{
              border-left-color: #9dccfd;
            }
            i{
              color: #409EFF;
            }
          }
        }
      }
    }
  }

}
</style>
