// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
import {get, post, post_obj_array, post_array } from '../../utils/axios'
const category = {
    namespaced: true,
    state() {
        return {
            listData: null,
            ids: [],
            options: [],
            addOrEditData: {},
            id: null,
        }
    },
    mutations: {
        setListData(state, list) {
            state.listData = list
        },
        setIds(state, ids) {
            state.ids = ids;
        },
        setOptions(state, options) {
            state.options = options;
        },
        setAddOrEditData(state, obj) {
            state.addOrEditData = obj;
        },
        setId(state, id) {
            state.id = id;
        }
    },
    actions: {
        //加载数据树状
        loadData(context) {
            get('/category/findCategoryTree').then((resp) => {
                context.commit('setListData', resp.data)
            })
        },
        loadAllData(context) {
            return get('/category/findAll').then((resp) => {
                context.commit('setOptions', resp.data)
            })
        },
        addOrEdit(context) {
            return post('/category/saveOrUpdate', context.state.addOrEditData).then((resp) => {
                context.dispatch('loadData')
            })
        },
        //删除事件
        deleteData(context) {
            get('/category/deleteById', { id: context.state.id }).then((resp) => {
                // console.log(resp);
                context.dispatch('loadData')
            })
        },
        //批量删除方法
        batchDelete(context) {
            return post_array('/category/batchDelete', { ids: context.state.ids }).then((resp) => {
                context.dispatch('loadData');
            }).catch((resp) => {
                // console.log(resp);
            })
        },
    }
}
export default category;