package project.khu.feature.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatContentId implements Serializable {

    private Integer chat_send_time;
    private Integer user_number;
}
