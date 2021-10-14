<template>
  <div style="height: 150px; min-height: 150px">
    <div v-for="(item, idx) in dashBoardList" :key="idx" style="display: grid; grid-template-columns: repeat(3, minmax(25%, auto))">
      <span>{{item.name}}</span>
      <span>{{item.price}}원</span>
      <span>{{item.rate}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinTicker",
  created() {
  },
  computed: {
    dashBoardList() {
      return this.$store.state.dashBoardList
    }
  }
}
</script>

<style scoped>

</style>