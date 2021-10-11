<template>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(25%, auto)); height: 15vh; overflow-y: scroll;">
    <div v-for="(coin, idx) in coinList" :key="idx">
      <input type="checkbox" :for="coin.market" v-model="checkedCoins" :value="coin.market" @change="checkedCoin">
      <span style="font-size: 2vh">{{coin.korean_name}}</span>
    </div>
  </div>
</template>

<script>
import coinList from '../../CoinList'
import {upbitTickerSend} from "@/socket";
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
  },
  methods: {
    checkedCoin() {
      this.$store.dispatch('FETCH_COIN_LIST', this.checkedCoins)
      upbitTickerSend(this.checkedCoins);
    }
  }
}
</script>

