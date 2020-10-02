<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <el-button @click="toAddDataHandler">新增</el-button>
    <el-button type="danger" @click='tobatchDelete'>批量删除</el-button>
    <!-- /按钮组 -->
    <!-- 表格 -->
    <el-table
      style="margin-top:10px"
      v-loading="listLoading"
      :data="list"
      width='100%'
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
     <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="真名"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column label="时间"  align="center">
        <template slot-scope="scope">
          <span>{{getDate(scope.row.registerTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230px">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           <el-button
          size="mini"
          type="parmin"
          @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
     <div style="text-align:center;margin-top:20px">
       <el-pagination
      background
      layout="prev, pager, next"
      page-size="5"
      :total="total"
      @current-change='pageChangeHandler'
      style="text-align:ceneter">
    </el-pagination>
    <!-- /分页 -->
     </div>
     <!-- 模态框 -->
     <el-dialog title="保存员工信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
       <el-form :rules="rules" ref="dialigForm" :model="waiters">
       <el-form-item label="用户名" prop='username'>
          <el-input v-model="waiters.username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="waiters.telephone"></el-input>
        </el-form-item>
        <el-form-item label="真名">
          <el-input v-model="waiters.realname"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="waiters.city"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch
            v-model="waiters.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-upload
          class="avatar-uploader"
          action="http://121.199.29.84:8001/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgPhoto" :src="imgPhoto" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeModals">取 消</el-button>
          <el-button type="primary" @click="suerButtonHandlerFather('dialigForm')">确 定</el-button>
        </div>
      </el-dialog>
     <!-- /模态框 -->
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return { 
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
      },
    }
  },
  //在仓库中的数据获取时 必须写在计算属性当中
  computed:{
     ...mapState('waiters',['list','listLoading','total','dialogFormVisible','waiters','message','imgPhoto']),
  },
  methods:{
    ...mapActions('waiters',['fetchData','queryPageFind','suerButtonHandler','deleteData','batchDelete']),
    ...mapMutations('waiters',['setParam','openModal','closeModal','setWaiters','setId','setIds','addImg','setImg','setDetail']),
    //分页 当前页码发生变化时 将当前页传给状态机
    pageChangeHandler(currtPage){
      var page=currtPage-1;
      var pageSize=5;
       this.setParam({page,pageSize});
       this.queryPageFind();
    },
    //弹出模态框
    toAddDataHandler(){
     this.openModal();
    },
    closeModals(){
      this.$refs['dialigForm'].resetFields();
      this.closeModal()  
    },
    //关闭模态框的方法
    handleClose(formName){
      this.$refs['dialigForm'].resetFields();
      this.closeModal()
    },
    //弹出模态框，并将当前行赋值给waiters
    handleEdit(index,row){
      //  this.$refs['dialigForm'].resetFields();
      console.log(row);
       this.setWaiters(row);
       this.openModal();
    },
    //确定按钮触发事件 包括表单验证 以及数据交互
    suerButtonHandlerFather(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.suerButtonHandler().then(()=>{
              this.$message({
                message: this.message,
                type: 'success'
              });
            })
          this.closeModal();  
          } else {
            return false;
          }
        });
    },
    //删除按钮事件方法
    handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setId(row.id);
          this.deleteData().then(()=>{
            this.$message({
            type: 'success',
            message: this.message
          });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //在每点击一次复选框都会执行一次以下事件，为状态机中的ids赋值，用于批量删除
    handleSelectionChange(val){
        var ids=[];
        val.forEach(element => {
            ids.push(element.id)
        });
        this.setIds(ids);
    },
    //批量删除按钮事件
    tobatchDelete(){
      this.$confirm('此操作将永久删除这些文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.batchDelete().then(()=>{
            this.$message({
            type: 'success',
            message: this.message
          });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //修改时间格式
    getDate(date){
      var date = new Date(date);
      return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDay()
    },
    //图片上传函数 上传成功之后会执行这个方法
    handleAvatarSuccess(res, file) {
        this.setImg('http://121.199.29.84:8888/group1/'+res.data.id);
        this.addImg(this.imgPhoto);
    },
    //再上传之前执行的函数
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
    handleDetail(index,row){
           this.setDetail(row);
           this.$router.push('/detail')    
   }
},
  created() {
    //再初始化页面时，加载一部分数据
    this.queryPageFind();
  },
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>