// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
import {get, post, post_obj_array, post_array } from '../../utils/axios'
const orders = {
    namespaced: true,
    state() {
        return {
            orderList: [],
            status: '',
            addressDeObj: {},
            orderDeArr: [],
            deleteOfId: null,
            orderId: null,
        }
    },
    mutations: {
        //赋值查询出来的数据
        setOrderList(state, list) {
            state.orderList = list
        },
        //赋值状态用于不同标签页显示不同数据
        setStatus(state, status) {
            state.status = status;
        },
        //地址详情
        setAddressDe(state, obj) {
            state.addressDeObj = obj;
        },
        //订单详情
        setOrderDeArr(state, arr) {
            state.orderDeArr = arr;
        },
        //获取订单id
        setOrderId(state, id) {
            state.orderId = id;
        }
    },
    actions: {
        //按需查找数据
        loadOrders(context) {
            if (context.state.status == '全部订单') {
                context.state.status = ''
            }
            get('/order/query', { customersId: null, waiterId: null, status: context.state.status }).then((resp) => {
                context.commit('setOrderList', resp.data);
            })
        },
    }
}
export default orders;