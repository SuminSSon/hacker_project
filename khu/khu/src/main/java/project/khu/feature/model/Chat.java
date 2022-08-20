package project.khu.feature.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.security.Key;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

//@Entity
//@Table(name="chat")
//@NoArgsConstructor
//@Getter
//@Setter
//@RequiredArgsConstructor
//@Builder
//@AllArgsConstructor
//@ToString(callSuper = true)

@Entity
@Table(name="chat" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="chat_number", nullable = false)
    private Integer chat_number; // 채팅방 번호 PK

    @Column(name = "chat_max")
    private Integer chat_max; // 최대 인원수

    @Column(name = "chat_mentee")
    private Integer chat_mentee; // 신청 멘티수

    @ManyToOne
    @JoinColumn(name = "subject_number", referencedColumnName = "subject_number")
    private SubjectInfo subject_number; // 과목 번호 FK

    @Column(name = "user_tag")
    private String user_tag; // 어필 태그
    // 고민 좀


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Chat chat = (Chat) o;
        return chat_number != null && Objects.equals(chat_number, chat.chat_number);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
