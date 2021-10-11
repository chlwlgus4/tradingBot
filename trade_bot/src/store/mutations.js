export default {
    SET_USERINFO(state, name) {
      state.userInfo.userName = name;
    },
    SET_RECVLIST(state, recvList) {
        state.recvList = recvList
    },
    SET_COIN_LIST(state, coinList) {
        state.coinList = coinList
    },
    SET_DASHBOARD_LIST(state, data) {
        let list = [...state.dashBoardList];
        const addCoin = state.dashBoardList.find((item, idx) => {
            if(item.name === data.name) {
                list[idx] = data;
            }
            return item.name === data.name
        });

        if(!addCoin) {
            list.push(data);
        }

        state.dashBoardList = list;
    }

}