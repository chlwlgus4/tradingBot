import Vuex from 'vuex'
import Vue from 'vue'
import mutations from "./mutations";
import actions from './action'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        recvList: [],
        coinList: [],
        dashBoardList: [],
        userInfo: {
            userName: ''
        },
        message: '',
    },
    getters: {
        getUserName: state => {
            return state.userInfo.userName;
        },
        getRecvList: state => {
            return state.recvList;
        }
    },
    actions,
    mutations
})