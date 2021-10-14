<template>
  <div>
    <button @click="$emit('close')">X</button>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(25%, auto)); height: 15vh; overflow-y: scroll;">
      <div v-for="(coin, idx) in coinList" :key="idx" >
        <input type="checkbox" :for="coin.market" v-model="checkedCoins" :value="coin.market" @change="checkedCoin($event)">
        <span style="font-size: 2vh">{{ coin.korean_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import coinList from '../../CoinList'
import {upbitTickerSend, upbitTickerClose} from "@/socket";

export default {
  data() {
    return {
      checkedCoins: []
    }
  },
  computed: {
    coinList() {
      return coinList.filter(data => data.market.startsWith('KRW') === true);
    },
    dashBoardList() {
      return this.$store.state.dashBoardList;
    }
  },
  methods: {
    checkedCoin(e) {
      const checked = e.target.checked;
      if(!checked) {
        const dashList = this.dashBoardList.filter(coin => coin.code !== e.target.value);
        this.$store.dispatch('DELETE_DASHBOARD_LIST', dashList);
        if(dashList.length === 0) upbitTickerClose();
        upbitTickerSend(this.checkedCoins);
        return;
      }
      upbitTickerSend(this.checkedCoins);
    }
  }
}
</script>

