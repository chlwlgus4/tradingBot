import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import {store} from '../store/index'
import coinList from '../../CoinList'

// eslint-disable-next-line no-unused-vars
let stompClient;
// eslint-disable-next-line no-unused-vars
let connected = false;
let upbitStompClient;

function conncet() {
    let recvMsg = '';
    const serverURL = process.env.VUE_APP_URL
    let socket = new SockJS(serverURL);
    stompClient = Stomp.over(socket);

    console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
    stompClient.connect(
        {},
        frame => {
            // 소켓 연결 성공
            connected = true;
            console.log('소켓 연결 성공', frame);
            // 서버의 메시지 전송 endpoint를 구독.
            // 이런 형태를 pub sub 구조라고 함

            stompClient.subscribe('/send', res => {
                recvMsg = JSON.parse(res.body);
                console.log('구독으로 받은 메시지 입니다.', recvMsg);
                // 받은 데이터를 json으로 파싱하고 리스트에 넣기
                console.log(store.getters.getUserName)
                recvMsg.who = store.getters.getUserName === recvMsg.userName ? 'me' : 'stranger';

                store.dispatch('FETCH_RECVLIST', recvMsg)
            });
        }, error => {
            console.log('소켓 연결 실패', error);
            connected = false;
        }
    );
}

function send(userName, message) {
    console.log("Send message:" + message);
    if (stompClient && stompClient.connected) {
        const msg = {
            userName: userName,
            content: message
        };
        stompClient.send("/receive", JSON.stringify(msg), {});
    }
}

function upbitConnect() {
    const tickerUrl = process.env.VUE_APP_TICKER_URL
    upbitStompClient = new WebSocket(tickerUrl);
    upbitStompClient.binaryType = 'arraybuffer';
    console.log(`소켓 연결을 시도합니다. 서버 주소: ${tickerUrl}`);

    upbitStompClient.onopen = () => {
        console.log('소켓 연결 성공');
        upbitStompClient.onmessage = ({data}) => {
            const enc = new TextDecoder("utf-8");
            const arr = new Uint8Array(data);
            const str_d = enc.decode(arr);
            const d = JSON.parse(str_d);
            const coinName = coinList.filter(data => data.market === d.code)[0].korean_name;
            //console.log(coinName, d.trade_price, d.signed_change_rate);

            store.dispatch('FETCH_DASHBOARD_LIST', {
                name: coinName,
                price: d.trade_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                rate: (d.signed_change_rate * 100).toFixed(2)
            })
        }
    }
}

function upbitTickerSend(coinList) {
    const sendData = JSON.stringify([{"ticket":"UPBIT_TICKER"},{"type":"ticker","codes":coinList}]);
    upbitStompClient.send(sendData)
}

export {
    conncet,
    send,
    upbitConnect,
    upbitTickerSend
}