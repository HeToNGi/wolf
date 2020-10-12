// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
import {get, post, post_obj_array, post_array } from '../../utils/axios'
const waiters = {
    namespaced: true,
    state() {
        return {
            list: null,
            listLoading: false,
            total: null,
            param: { page: 0, pageSize: 5 },
            dialogFormVisible: false,
            waiters: {},
            message: '',
            id: null,
            ids: [],
            imgPhoto: '',
            detail: null,
            orderId: null,
            waiterId: null
        }
    },
    mutations: {
        //修改List
        setList(state, list) {
            state.list = list;
        },
        //修改加载状态
        setLoading(state, listLoading) {
            state.listLoading = listLoading;
        },
        //修改分页总条数
        setTotal(state, total) {
            state.total = total;
        },
        //修改分页插叙所传输数据
        setParam(state, param) {
            state.param = param;
        },
        //打开模态框
        openModal(state) {
            state.dialogFormVisible = true;
        },
        //关闭模态框
        closeModal(state) {
            state.dialogFormVisible = false;
            state.waiters = {};
            state.imgPhoto = '';
        },
        //修改新增和修改所传输的数据
        setWaiters(state, waiters) {
            state.waiters = waiters;
            state.imgPhoto = waiters.imgPhoto;
        },
        //修改消息
        setMessage(state, message) {
            state.message = message;
        },
        //修改删除使用的id
        setId(state, id) {
            state.id = id;
        },
        //修改批量删除的id数组
        setIds(state, ids) {
            state.ids = ids;
        },
        //新增图片
        addImg(state, imgUrl) {
            state.waiters.imgPhoto = imgUrl;
        },
        setImg(state, imgUrl) {
            state.imgPhoto = imgUrl;
        },
        setDetail(state, detailData) {
            state.detailData = detailData
        },
        setOrderId(state, id) {
            state.orderId = id;
        },
        setWaiterId(state, id) {
            state.waiterId = id
        }
    },
    actions: {
        fetchData({ commit }) {
            // get('waiter/findAll').then((resp) => {
            //     commit('setList', resp.data);
            //     commit('setLoading', false);
            // })
        },
        //查询数据的方法
        queryPageFind(context) {
            post('/waiter/query', context.state.param).then((resp) => {
                context.commit('setList', resp.data.list);
                context.commit('setTotal', resp.data.total)
            })
        },
        //修改和新增的方法
        suerButtonHandler(context) {
            if (!context.state.waiters.status) {
                context.state.waiters.status = '禁用';
            } else {
                context.state.waiters.status = '启用';
            }
            return post('/waiter/saveOrUpdate', context.state.waiters).then((resp) => {
                context.dispatch('queryPageFind');
                context.commit('closeModal');
                context.commit('setMessage', resp.statusText);
            })
        },
        //通过id单个删除方法
        deleteData(context) {
            return get('/waiter/deleteById', { id: context.state.id }).then((resp) => {
                context.commit('setMessage', resp.statusText)
                context.dispatch('queryPageFind');
            })
        },
        //批量删除方法
        batchDelete(context) {
            return post_array('/waiter/batchDelete', { ids: context.state.ids }).then((resp) => {
                context.commit('setMessage', resp.statusText)
                context.dispatch('queryPageFind');
            }).catch((resp) => {
                // console.log(resp);
            })
        },
        //派单 拿到订单状态机中的订单id与这里的服务员id进行派单
        sendOrder(context) {
            return get('/order/sendOrder', { waiterId: context.state.waiterId, orderId: context.state.orderId })
        }
    }
}
export default waiters;