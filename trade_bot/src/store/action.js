export default {
    FETCH_USERINFO({commit}, name) {
        commit('SET_USERINFO', name);
    },
    FETCH_RECVLIST({commit, state}, data) {
        state.recvList.push(data)
        const recvList = state.recvList;
        commit('SET_RECVLIST', recvList);
    },
    FETCH_DASHBOARD_LIST({commit}, data) {
        commit('SET_DASHBOARD_LIST', data);
    },
    DELETE_DASHBOARD_LIST({commit}, data) {
        commit('DEL_DASHBOARD_LIST', data);
    }
}