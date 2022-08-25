package project.khu.feature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatContentSaveDTO {
    private Integer chat_send_time;
    private User user_number;
    private String chat_content;
}
