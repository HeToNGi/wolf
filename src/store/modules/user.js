//引入登录，退出，获取用户信息的方法
import { login, logout, getInfo } from '@/api/user'
//引入获取 更改 删除token的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601641210674&di=f6f2f9f931898d924049adb6ce63772b&imgtype=0&src=http%3A%2F%2Fimg2.oldkids.cn%2Fupload%2F260790000%2Fu260789219%2F2014%2F04%2F07%2Fgroup_20140407095429317439.gif'
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            //这里引用登录方法
            login({ username: username.trim(), password: password, type: 'manager' }).then(response => {
                //获取data
                const { data } = response
                //获取token 并且更改在状态机中的状态
                commit('SET_TOKEN', data.data.token)
                    //更改token
                setToken(data.data.token)
                    //执行成功的回调
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const { name, avatar } = data

                commit('SET_NAME', name)
                commit('SET_AVATAR', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601641210674&di=f6f2f9f931898d924049adb6ce63772b&imgtype=0&src=http%3A%2F%2Fimg2.oldkids.cn%2Fupload%2F260790000%2Fu260789219%2F2014%2F04%2F07%2Fgroup_20140407095429317439.gif')
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}