<template>
    <div>
         <!-- 按钮组 -->
        <el-button @click="toAddDataHandler" style="margin:10px">新增</el-button>
        <el-button type="danger" @click='tobatchDelete'>批量删除</el-button>
        <!-- /按钮组 -->    
        <!-- 表格 -->
       <el-table
        :data="listData"
        style="width: 100%"
        height="310"
         @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
         </el-table-column>
        <el-table-column
        fixed
        prop="name"
        label="产品名"
        >
        </el-table-column>
        <el-table-column
        prop="price"
        label="价格"
       >
        </el-table-column>
        <el-table-column
        prop="category.name"
        label="所属栏目"
       >
        </el-table-column>
        <el-table-column
        prop="status"
        label="状态"
        >
        </el-table-column>
        <el-table-column label="图片描述">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handlerDescription(scope.$index, scope.row)">详情</el-button>
        </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 详情 -->
    <el-dialog
        title="图文详情"
        :visible.sync="dialogVisible"
        width="30%">
        <div>{{description}}</div>
            <el-image
            style="width: 200px; height: 200px;margin:20px auto"
            :src="deImage"
            :fit="fit"></el-image>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /详情 -->
        <el-dialog title="这是标题" :visible.sync="dialogTableVisible">
          <el-form :model="addOrEditData">
            <el-form-item label="产品名称">
            <el-input v-model="addOrEditData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格">
            <el-input v-model="addOrEditData.price" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="产品描述">
                <el-input type="textarea" v-model="addOrEditData.description"></el-input>
            </el-form-item>
            <el-form-item>
            <el-select v-model="addOrEditData.categoryId" placeholder="所属栏目">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <br>           
            <el-upload
            class="avatar-uploader"
            action="http://121.199.29.84:8001/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="addOrEditData.photo" :src="addOrEditData.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>       
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureBtnHandler">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分页 -->
        <div style="text-align:center;margin-top:20px">
        <el-pagination
        background
        layout="prev, pager, next"
        page-size="5"
        :total="total"
        @current-change='changeHandler'>
        </el-pagination>
        </div>

        <!-- /分页 -->
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
     data(){
         return {
             dialogVisible:false,
             dialogTableVisible:false,
             description:'',
             deImage:'',
         }
     },
     computed:{
         ...mapState('product',['listData','addOrEditData','options','message','total'])
     },
     methods:{
         ...mapMutations('product',['setAddOrEdit','setPhoto','setMessage','setPage','setBatchArr']),
         ...mapActions('product',['loadData','deleteData','loadCategoryData','addOrEdit','batchDelete']),
         //单击图文详情的事件
         handlerDescription(index,row){
             //显示模态框
              this.dialogVisible=true;
              //描述
              this.description=row.description;
            //   图片地址
              this.deImage=row.photo
         },
         handleDelete(index,row){
             this.deleteData(row.id).then(()=>{
                this.$notify({
                    title: '提示',
                    message:this.message 
                    });
                this.loadData();
             })
         },
        //单击新增按钮触发事件
        toAddDataHandler(){
            this.setAddOrEdit({});
           this.dialogTableVisible=true
        },
            //图片上传函数 上传成功之后会执行这个方法
        handleAvatarSuccess(res, file) {
            this.setPhoto('http://121.199.29.84:8888/group1/'+res.data.id);
            // this.addImg(this.imgPhoto);
        },
        //再上传之前执行的函数
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        sureBtnHandler(){
            this.dialogTableVisible = false;
            this.addOrEdit().then(()=>{
                 this.$notify({
                    title: '提示',
                    message:this.message 
                    });
            });
        },
        //单击编辑按钮触发事件
        handleEdit(index,row){
            this.setAddOrEdit(row);
            this.dialogTableVisible=true
        },
        changeHandler(currt){
            this.setPage(currt-1);
            this.loadData();       
        },
        handleSelectionChange(selection){
            var result=selection.map(item=>{
                return item.id;
            });
            this.setBatchArr(result)
        },
        tobatchDelete(){
            this.$confirm('此操作将永久删除这些产品, 是否继续?', '提示', {
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
     },
     created(){
         this.setPage(0)
         //加载基本信息
         this.loadData();
         //查询栏目信息，用于新增
         this.loadCategoryData()
     }
}
</script>
<style >
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