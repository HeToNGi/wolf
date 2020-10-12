<template>
   <div id="detail">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>员工详情</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
        </div>
        <div v-for="item in data" :key="item" class="text item">
            {{item[0] + '  '+item[1] }}
        </div>
        </el-card>   
    </div>
</template>
<script>
    import {mapState} from 'vuex'
export default {
    computed:{
         ...mapState('waiters',['detailData']),
         data(){
             return Object.entries(this.detailData)
         }
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    },
    created(){
        // console.log(this.$route);
        console.log(this.data);
    }
}
</script>