export default {
    SET_USERINFO(state, name) {
      state.userInfo.userName = name;
    },
    SET_RECVLIST(state, recvList) {
        state.recvList = recvList
    }
}