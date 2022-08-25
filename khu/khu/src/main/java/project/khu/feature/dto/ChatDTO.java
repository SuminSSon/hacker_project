package project.khu.feature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private Integer chat_number;

    private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 WebSocket Connection이 맺어진 세샨

    public static ChatDTO create(Integer chat_number) {
        ChatDTO room = new ChatDTO();

        room.chat_number = chat_number;
        return room;
    }
}
