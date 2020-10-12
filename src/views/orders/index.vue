<template>
    <div>
        <el-tabs @tab-click="handleClick" v-model="value" stretch='true'>
            <el-tab-pane label="全部订单" name="全部订单">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="待支付">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
             <el-tab-pane label="已完成" name="已完成">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待接单" name="待接单">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待派单" name="待派单">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="派单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="sendOrder(scope.$index, scope.row)">授权</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待确认" name="待确认">
                <el-table
                :data="orderList"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="customer.username"
                    label="用户名"
                    width="180">
                </el-table-column>
                 <el-table-column
                    prop="customer.id"
                    label="用户编号"
                    width="180">
                </el-table-column>
                <el-table-column label="地址" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="addressDe(scope.$index, scope.row)">地址详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="订单" align='center'>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="orderDe(scope.$index, scope.row)">订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
                </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 详细地址模态框 -->
        <el-dialog
        title="详细地址"
        :visible.sync="dialogVisibleOne"
        width="30%"
        >
        {{addressDeObj}}
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleOne = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleOne = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /详细地址模态框 -->
        <!-- 订单详情模态框 -->
        <el-dialog
        title="订单详情"
        :visible.sync="dialogVisibleTwo"
        width="30%"
        >
        {{orderDeArr}}
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleTwo = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /订单详情模态框 -->
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            value:'全部订单',
            dialogVisibleOne:false,
            dialogVisibleTwo:false
        }
    },
    computed:{
        ...mapState('orders',['orderList','addressDeObj','orderDeArr'])
    },
    methods:{
        ...mapMutations('orders',['setStatus','setAddressDe','setOrderDeArr','setDeleteOfId','setOrderId']),
        ...mapActions('orders',['loadOrders','deleteById']),
        //切换标签页方法
        handleClick(tab,event){
            this.setStatus(this.value);
            this.loadOrders();
        },
        //地址详情方法
        addressDe(index,row){
            this.setAddressDe(row.address)
            this.dialogVisibleOne=true
        },
        //订单详情方法
        orderDe(index,row){
            this.setOrderDeArr(row.orderLines);
            this.dialogVisibleTwo=true;
        },
        //单击派单方法
        sendOrder(index,row){
            this.setOrderId(row.id);
            this.$router.push('/waiters/index'); 
        }
    },
    created(){
        //页面加载时加载全部订单
        this.setStatus('');
        //查询订单
        this.loadOrders();
    }
}
</script>