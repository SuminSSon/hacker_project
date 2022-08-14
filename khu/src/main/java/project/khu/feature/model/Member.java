package project.khu.feature.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="member" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(MemberId.class)
public class Member {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_number", referencedColumnName = "user_number")
    private User user_number; // 유저 번호 FK, PK

    @Id
    @ManyToOne
    @JoinColumn(name = "chat_number", referencedColumnName = "chat_number")
    private Chat chat_number; // 채팅방 번호 FK, PK

    @Column(name = "mentor_check")
    private boolean chat_mentee; // 멘토 여부

    @Column(name = "last_check_time")
    @CreationTimestamp
    private LocalDateTime last_check_time; // 마지막 확인 시각

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Member member = (Member) o;
        return user_number != null && Objects.equals(user_number, member.user_number)
                && chat_number != null && Objects.equals(chat_number, member.chat_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_number, chat_number);
    }
}
