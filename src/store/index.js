import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import waiters from './waiters/index'
import orders from './orders/index'
import product from './product/index'
import category from './category/index'
import dashboard from './dashboard/index'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        waiters,
        orders,
        product,
        category,
        dashboard
    },
    getters
})

export default store