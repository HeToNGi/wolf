<template>
    <div>
    <!-- 按钮 -->
        <el-button @click="toAddDataHandler" style="margin:10px">新增</el-button>
        <el-button type="danger" @click='tobatchDelete'>批量删除</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table
        :data="listData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
          @selection-change="handleSelectionChange"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        type="selection"
        width="50">
        </el-table-column>
        <el-table-column
        prop="id"
        label="编号"
        sortable>
        </el-table-column>
        <el-table-column
        prop="name"
        label="栏目名称"
        sortable>
        </el-table-column>
        <el-table-column
        label="图标"
        sortable>
          <template slot-scope="scope">
                <el-image
                style="width: 20px; height: 20px"
                :src="scope.row.icon"
                :fit="fit"></el-image>
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
    <!-- 模态框 -->
    <el-dialog title="这是标题" :visible.sync="dialogTableVisible">
          <el-form :model="addOrEditData">
            <el-form-item label="栏目名称">
            <el-input v-model="addOrEditData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-select v-model="addOrEditData.parentId" placeholder="所属栏目">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>      
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureBtnHandler">确 定</el-button>
          </div>
        </el-dialog>
    <!-- /模态框 -->
    </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    data(){
        return {
            dialogTableVisible:false,
        }
    },
    computed:{
        ...mapState('category',['listData','options','addOrEditData'])
    },
    methods:{
        ...mapActions('category',['loadData','loadAllData','addOrEdit','deleteData','batchDelete']),
        ...mapMutations('category',['setIds','setAddOrEditData','setId']),
        handleSelectionChange(currt){
            var result=currt.map((item)=>{
                return item.id
            });
            this.setIds(result);
        },
        handleEdit(index,row){
            this.dialogTableVisible=true;
            this.setAddOrEditData(row)
        },
        handleDelete(index,row){
            this.setId(row.id);
            this.deleteData();
        },
        toAddDataHandler(){
            this.loadAllData().then(()=>{
                this.setAddOrEditData({})
                this.dialogTableVisible=true;
            });

        },
        sureBtnHandler(){
            this.addOrEdit().then(()=>{
                this.loadData()
            });
            this.dialogTableVisible=false;
        },
        tobatchDelete(){
           this.batchDelete();
        }
    },
    created(){
       this.loadData();
       this.loadAllData();
    }
}
</script>