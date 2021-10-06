package com.trade.bot.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
//@Component
//@ServerEndpoint(value = "/") //서버가 바인딩된 주소
public class Socket {
    private Session session;
    public static Set<Socket> listners = new CopyOnWriteArraySet<>();
    private static int onlineCount = 0;

    @OnOpen //클라이언트가 소캣에 연결될때 마다 호출
    public void onOpen(Session session) {
        onlineCount++;
        this.session = session;
        listners.add(this);
        log.info("onOpen called, onlineCount : " + onlineCount);
    }

    @OnClose //클라이언트와 소켓과의 연결이 닫힐때 마다 호출
    public void onClose(Session session) {
        onlineCount--;
        listners.remove(this);
        log.info("onClose called, onlineCount : " + onlineCount);
    }

    @OnMessage
    public void onMessage(String message) {
        log.info("onMessage called, message : " + message);
        brodcast(message);
    }

    @OnError //의도치 않은 에러 발생
    public void onError(Session session, Throwable throwable) {
        log.warn("onClose called, error : " + throwable.getMessage());
        listners.remove(this);
        onlineCount--;
    }

    public static void brodcast(String message) {
        for(Socket listen : listners) {
            listen.sendMessage(message);
        }
    }

    public void sendMessage(String message) {
        try {
            this.session.getBasicRemote().sendText(message);
        }catch (IOException e) {
            log.warn("Caught exception while sending message to Session " + this.session.getId() + "error:" + e.getMessage());
        }
    }
}
