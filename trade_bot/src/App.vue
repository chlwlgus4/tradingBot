<template>
  <div id="app">
    유저이름:
    <input v-model="userName" type="text">내용: <input v-model="message" type="text" @keyup="onKeyPress">
    <button @click="sendMessage">입력</button>
    <div></div>
    <div :style="{background: 'lightblue', padding: '10px', width: 'chatWidth', marginTop: '15px', height: '70vh', overflow: 'scroll'}">
      <div v-for="(item, idx) in recvList" :key="idx" style="height: 60px">
        <div :style="{width: '23vh', background: 'white', padding: '7px', borderRadius: '5px', float: item.who === 'me' ? 'right' : 'left'}">
          <span style="font-size: 10px">유저이름: {{ item.userName }}</span>
          <br/>
          <span style="font-size: 11px; word-break: break-all">{{ item.content }}</span>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
import {conncet, send} from './socket'
import { mapGetters } from "vuex";

export default {
  name: 'App',
  data() {
    return {
      userName: "",
      message: "",
      chatWidth: ''
    }
  },
  computed: {
    ...mapGetters(["getUserName"]),
    recvList(){
      return this.$store.state.recvList
    }
  },
  mounted() {
    this.chatWidth = window.innerWidth;
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    // this.connect()
    conncet();
  },
  methods: {
    onKeyPress(e) {
      if(e.keyCode === 13 && this.userName !== '' && this.message !== ''){
        send();
        this.message = ''
      }
    },
    sendMessage () {
      this.$store.dispatch('FETCH_USERINFO', this.userName);
      if(this.message) {
        send(this.userName, this.message);
        this.message = ''
      }
    },
  }
}
</script>