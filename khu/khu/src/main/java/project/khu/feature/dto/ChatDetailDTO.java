package project.khu.feature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.Chat;
import project.khu.feature.model.SubjectInfo;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDetailDTO {

    private Integer chat_number;
    private Integer chat_max;
    private Integer chat_mentee;
    private SubjectInfo subject_number;
    private String user_tag;

    public static ChatDetailDTO toChatDetailDTO(Chat chat) {
        ChatDetailDTO chatDetailDTO = new ChatDetailDTO();

        chatDetailDTO.setChat_number(chat.getChat_number());
        chatDetailDTO.setChat_max(chat.getChat_max());
        chatDetailDTO.setChat_mentee(chat.getChat_mentee());
        chatDetailDTO.setSubject_number(chat.getSubject_number());
        chatDetailDTO.setUser_tag(chat.getUser_tag());

        return chatDetailDTO;
    }
}
