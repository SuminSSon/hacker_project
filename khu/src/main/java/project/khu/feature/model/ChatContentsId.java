package project.khu.feature.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatContentsId implements Serializable {

    private Integer chat_send_time;
<<<<<<< HEAD
    private Integer user_number;
=======
    private User user_number;
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatContentsId that = (ChatContentsId) o;
        return Objects.equals(chat_send_time, that.chat_send_time) && Objects.equals(user_number, that.user_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(chat_send_time, user_number);
    }
}
