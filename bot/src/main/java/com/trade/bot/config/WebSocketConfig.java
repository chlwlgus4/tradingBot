package com.trade.bot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker //브로커 형식의 웹 소켓 활성화
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/send"); //구독 topic 등록시 앞에 붙이는 prefix
//        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        스프링부트에서 CORS 설정할 때 .allowCredentials(true)와 .allowedOrigins("*")는 동시에 설정 못하도록 업데이트되었다고 함.
//        모든 주소를 허용하는 대신 특정 패턴만 허용하는 것으로 적용해야한다고 변동되었음.
//        .allowedOrigins("*") 대신 .allowedOriginPatterns("*")를 사용하면 에러는 해결이 된다.
        registry.addEndpoint("/").setAllowedOriginPatterns("*").withSockJS(); // sockjs 지원
//        registry.addEndpoint("/"); // 그냥 websocket 지원
    }
}
