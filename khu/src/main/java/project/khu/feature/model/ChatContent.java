package project.khu.feature.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="chat_content" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(ChatContentId.class)
public class ChatContent {

    @Id
    @Column(name = "chat_send_time")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Integer chat_send_time; // 보낸 시각 PK

    @Id
    @ManyToOne
    @JoinColumn(name = "user_number", referencedColumnName = "user_number")
    private User user_number; // 유저 번호 FK, PK

    @Column(name = "chat_content")
    private String chat_content; // 채팅 내용

    @ManyToOne
    @JoinColumn(name = "chat_number", referencedColumnName = "chat_number")
    private Chat chat_number; // 채팅방 번호 FK

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ChatContent that = (ChatContent) o;
        return chat_send_time != null && Objects.equals(chat_send_time, that.chat_send_time)
                && user_number != null && Objects.equals(user_number, that.user_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(chat_send_time, user_number);
    }
}
