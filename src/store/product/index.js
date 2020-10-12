// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
import {get, post, post_obj_array, post_array } from '../../utils/axios'
const product = {
    namespaced: true,
    state() {
        return {
            listData: [],
            addOrEditData: {},
            options: [],
            message: '',
            total: 0,
            page: 0,
            batchArr: [],
        }
    },
    mutations: {
        setListData(state, list) {
            state.listData = list
        },
        setAddOrEdit(state, obj) {
            state.addOrEditData = obj;
        },
        setOptions(state, options) {
            state.options = options;
        },
        setPhoto(state, photo) {
            state.addOrEditData.photo = photo;
        },
        setMessage(state, message) {
            state.message = message;
        },
        setTotal(state, total) {
            state.total = total;
        },
        setPage(state, page) {
            state.page = page
        },
        setBatchArr(state, arr) {
            state.batchArr = arr;
        }
    },
    actions: {
        //加载初始数据
        loadData(context) {
            post('/product/queryProductCascadeCategory', { page: context.state.page, pageSize: 5 }).then((resp) => {
                context.commit('setListData', resp.data.list)
                context.commit('setTotal', resp.data.total)
            })
        },
        //删除事件
        deleteData(context, id) {
            return get("/product/deleteById", { id: id }).then((resp) => {
                context.commit('setMessage', resp.statusText);
            })
        },
        //加载相关栏目信息
        loadCategoryData({ commit }) {
            get('/category/findAll').then((resp) => {
                commit('setOptions', resp.data)
            })
        },
        //单击确定之后会执行的方法
        addOrEdit(context) {
            return post('/product/saveOrUpdate', context.state.addOrEditData).then((resp) => {
                console.log(resp);
                context.commit('setMessage', resp.statusText);
                context.dispatch('loadData');
            })
        },
        //批量删除方法
        batchDelete(context) {
            return post_array('/product/batchDelete', { ids: context.state.batchArr }).then((resp) => {
                context.commit('setMessage', resp.statusText)
                context.dispatch('loadData');
            }).catch((resp) => {
                // console.log(resp);
            })
        },
    }
}
export default product;