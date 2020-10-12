// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
import {get, post, post_obj_array, post_array } from '../../utils/axios'
const category = {
    namespaced: true,
    state() {
        return {
            categoryDataOfX: [],
            dataTree: []
        }
    },
    mutations: {
        setCategoryDataOfX(state, list) {
            state.categoryDataOfX = list;
        },
        setDataTree(state, list) {
            state.dataTree = list;
        }
    },
    actions: {
        loadCategoryDataOfX(context) {
            return get('/category/findCategoryTree').then((resp) => {
                var list = [];
                resp.data.forEach(element => {
                    list.push(element.name)
                });
                var listTree = [];
                resp.data.forEach(element => {
                    var obj = {
                        name: '',
                        children: []
                    };
                    obj.name = element.name;
                    element.children.forEach(item => {
                        var obj2 = {
                            name: '',
                            children: []
                        };
                        obj2.name = item.name;
                        obj.children.push(obj2)
                    });
                    listTree.push(obj)
                })
                context.commit('setDataTree', listTree);
                context.commit('setCategoryDataOfX', list);
            })
        },
    }
}
export default category;