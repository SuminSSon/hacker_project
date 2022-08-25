package project.khu.feature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.Chat;
import project.khu.feature.model.ChatContent;
import project.khu.feature.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatContentDetailDTO {

    private Chat chat_number;

    private Integer chat_send_time;
    private User user_number;
    private String chat_content;

    public static ChatContentDetailDTO toChatContentDetailDTO(ChatContent chatContent) {
        ChatContentDetailDTO chatContentDetailDTO = new ChatContentDetailDTO();

        chatContentDetailDTO.setChat_number(chatContent.getChat_number());
        chatContentDetailDTO.setChat_send_time(chatContent.getChat_send_time());
        chatContentDetailDTO.setUser_number(chatContent.getUser_number());
        chatContentDetailDTO.setChat_content(chatContent.getChat_content());

        return chatContentDetailDTO;
    }
}
