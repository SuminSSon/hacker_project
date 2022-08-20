package project.khu.feature.service.chat.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    //채팅 클라이언트가 서버와 연결한 웹소켓 세팅 부분 -> 웹소켓 연결 주소 -> /url/chat
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat/chatting") //엔드포인트를 통ㅇ해 프론트와 백엔드가 서로 통신 환경을 만듬
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/pub");
        // SimpleBroker는 해당하는 경로를 SUBCRIBE하는 Client에게 메시지를 전달하는 작업
        registry.setApplicationDestinationPrefixes("/sub");
        // SimpleBroker의 기능과 외부 Message Broker에 메시지를 전달하는 작업
    }
}

//프론트 socket 연결
// let socketJs = new SockJS("http://localhost:8080/chat/chatting");
// letstopcli = Stomp.over(socketJS);

//dependency
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'