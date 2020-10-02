<template>
   <div id="detail">
       <el-button @click="back" style="float:right">返回</el-button>
        {{detailData}}   
    </div>
</template>
<script>
    import {mapState} from 'vuex'
export default {
    computed:{
         ...mapState('waiters',['detailData']),
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    },
    created(){
        // console.log(this.$route);
    }
}
</script>