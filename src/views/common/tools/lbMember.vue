<template>
  <el-dialog 
    title="选择成员" 
    :visible.sync="dialogFormVisible" 
    class="lb-member-wrap" 
    :closeOnClickModal="false"
    :append-to-body="async"
  >
    <section class="member-main">
      <el-cascader
        class="lb-el-cascader"
        :options="options"
        :show-all-levels="false"
        expand-trigger="hover"
        @change="handleChange"
        filterable
        :props="optionProps"
        placeholder="请输入部门/门店名称"
        v-model="val"
      ></el-cascader>
    </section>
  </el-dialog>
</template>

<script>
import api from '@/api/api';
// import globalFn from '@/assets/javascripts/globalFn'
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['midObj'])
  },
  props:{
    async :{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      dialogFormVisible : false,
      obj:{},
      optionProps :{
        value:'id',
        label:'name'
      },
      options: [],
      val:[]
    }
  },
  methods : {
    init (arr) {
      this.dialogFormVisible = true;
      this.getDepAndStaffInfoList();
    },
    handleChange(value) {
      this.val =  [];
      this.dialogFormVisible = false;
      this.$emit('handleChange',this.getCascaderObj(value,this.options));
    },
    getCascaderObj(val,opt) {
      return val.map( function(value, index, array){
        for (var itm of opt) {
          if (itm.id == value) { 
            opt = itm.children; 
            return itm; 
          }
        }
        return null;
      });
    },
    //获取企业部门列表以及部门下人员列表
    getDepAndStaffInfoList () {
      let obj = {
            mid:this.midObj.mid,
            keyWord:''
          }
      api.getDepAndStaffInfoList(obj).then((res)=>{
        if(res.code ==1){
          this.options=res.data;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lb-member-wrap{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
<style lang="scss">
.lb-member-wrap{
  .el-dialog__header{
    border-bottom: 1px solid #ececec;
  }
  .el-dialog{
    min-width: 500px;
  }
  .lb-el-cascader{
    width:100%
  }
}
</style>
