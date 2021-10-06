package com.trade.bot.web;

import com.trade.bot.vo.SocketVO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    // receive 메시지를 받을 endpoint
    @MessageMapping("/receive")
    // send로 메시지를 반환
    @SendTo("/send")
    public SocketVO SocketHandler(SocketVO socketVO) {
        return socketVO;
    }

}
