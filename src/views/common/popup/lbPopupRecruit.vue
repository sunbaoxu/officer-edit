<template>
  <el-dialog 
    title="添加招聘"
    :visible.sync="dialogFormVisible" 
    class="lb-popup-news-wrap" 
    width="790px"
    :closeOnClickModal="false"
  >
    <section class="main-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="list-box">
          <el-col :span="12" class="title">
            <el-form-item label="招聘职位" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入招聘职位，10个字符内"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12" >
           <el-form-item label="职位薪资" prop="salary">
              <el-input v-model="ruleForm.salary" placeholder="请输入职位薪资，8个字符内"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="list-box">
          <el-col :span="12" class="title">
            <el-form-item label="工作城市" prop="city">
            <el-input v-model="ruleForm.city" placeholder="请输入工作城市"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12" >
           <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="list-box">
          <el-col :span="12" class="title">
            <el-form-item label="学历要求" prop="educationKey">
            <el-select v-model="ruleForm.educationKey" placeholder="请选择">
              <el-option
                v-for="item in educationArr"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12" >
           <el-form-item label="经验要求" prop="experienceKey">
              <el-select v-model="ruleForm.experienceKey" placeholder="请选择">
                <el-option
                  v-for="item in experienceArr"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div>
        <div class="list-box">
          <el-col :span="12" class="title">
            <el-form-item label="HR手机号" prop="hrId">
              <el-input v-model="ruleForm.hrId" placeholder="请输入HR联系手机号" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
           <el-form-item label="招聘结束" prop="stopDate">
              <el-date-picker
                v-model="ruleForm.stopDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      
      
      <div class="list-box">
        <el-col :span="4" class="title">&nbsp;&nbsp;&nbsp;招聘详情：</el-col>
        <el-col :span="20" >
          <quill-editor 
            v-model="ruleForm.content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" 
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </el-col>
      </div>
      <div class="footer-box">
            <el-button type="primary" :loading="btnAsync" @click="submitForm('ruleForm')">确定添加</el-button>
            
          </div>
    </section>
  </el-dialog>
</template>

<script>
import api from '@/api/api';
import { quillEditor } from 'vue-quill-editor'
// import globalFn from '@/assets/javascripts/globalFn'
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['midObj'])
  },
  data () {
    return {
      btnAsync : false,
      dialogFormVisible :false,
      type:'2',
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
      },
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '职位不能为空', trigger: ['blur','change'] },
          { min: 1, max: 10, message: '请输入招聘职位，10个字符内', trigger: ['blur','change'] }
        ],
        salary: [
          { required: true, message: '职位薪资不能为空', trigger: ['blur','change'] }
        ],
        city: [
          { required: true, message: '工作城市不能为空', trigger: ['blur','change'] }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: ['blur','change'] }
        ],
        educationKey: [
          { required: true, message: '学历要求不能为空', trigger: ['blur','change'] }
        ],
        experienceKey: [
          { required: true, message: '经验要求不能为空', trigger: ['blur','change'] }
        ],
        hrId: [
          { required: true, message: 'HR联系手机号不能为空', trigger: ['blur','change'] },
          { min: 1, max: 11, message: '请输入手机号，11个字符内', trigger: ['blur','change'] }
        ],
        stopDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      educationArr: [
        {key: 1001,value: '初中及以下'}, 
        {key: 1002,value: '中专/中技'}, 
        {key: 1003,value: '高中'}, 
        {key: 1004,value: '大专'}, 
        {key: 1005,value: '本科'}, 
        {key: 1006,value: '硕士'}, 
        {key: 1007,value: '博士'}, 
        {key: 1008,value: '不限'}
      ],
      experienceArr :[
        {key: 2001,value: '应届生'},
        {key: 2002,value: '1年以内'},
        {key: 2003,value: '1-3年'},
        {key: 2004,value: '3-5年'},
        {key: 2005,value: '5-10年'},
        {key: 2006,value: '10年以上'},
        {key: 2007,value: '不限'}
      ]
    }
  },
  methods : {
    init(obj) {
      this.dialogFormVisible = true;
 
      this.ruleForm = obj || {
        name: '',
        salary:'',
        city:'',
        address:'',
        educationKey:'',
        experienceKey:'',
        hrId:'',
        stopDate:'',
        content:""
      };

      if(!obj){
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()   //对表单进行重置。
        })
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
    //新增或者修改企业资讯信息
    addOrUpdateRecruitmentInfo(){
      this.ruleForm.mid = this.midObj.mid; 
      this.btnAsync = true;
      api.addOrUpdateRecruitmentInfo(this.ruleForm).then((res)=>{
        this.btnAsync = false;
        if(res.code ==1){
          this.$emit('clickPopupRecruitFn');
          this.dialogFormVisible= false;
          this.ruleForm = {
            name: '',
            salary:'',
            city:'',
            address:'',
            educationKey:'',
            experienceKey:'',
            hrId:'',
            stopDate:'',
            content:""
          };
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOrUpdateRecruitmentInfo()
        } else {
          return false;
        }
      });
    },
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
      overflow: hidden;
    }
  }
  .footer-box{
    padding-top: 40px;
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

