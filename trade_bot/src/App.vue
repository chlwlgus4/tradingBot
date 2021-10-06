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
          <span style="font-size: 13px; word-break: break-all">{{ item.content }}</span>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'App',
  data() {
    return {
      userName: "",
      message: "",
      recvList: [],
      who: 'me',
      chatWidth: ''
    }
  },
  mounted() {
    this.chatWidth = window.innerWidth;
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect()
  },
  methods: {
    onKeyPress(e) {
      if(e.keyCode === 13 && this.userName !== '' && this.message !== ''){
        this.send()
        this.message = ''
      }
    },
    sendMessage () {
      if(this.message) {
        this.send()
        this.message = ''
      }
    },
    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userName,
          content: this.message
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = process.env.VUE_APP_URL
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
          {},
          frame => {
            // 소켓 연결 성공
            this.connected = true;
            console.log('소켓 연결 성공', frame);
            // 서버의 메시지 전송 endpoint를 구독합니다.
            // 이런형태를 pub sub 구조라고 합니다.
            this.stompClient.subscribe("/send", res => {

              const recvMsg = JSON.parse(res.body);
              console.log('구독으로 받은 메시지 입니다.', recvMsg);
              // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
              recvMsg.who = this.userName === recvMsg.userName ? 'me' : 'stranger';
              this.recvList.push(recvMsg)
            });
          },
          error => {
            // 소켓 연결 실패
            console.log('소켓 연결 실패', error);
            this.connected = false;
          }
      );
    }
  }
}
</script>