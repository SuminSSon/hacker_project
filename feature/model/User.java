package project.khu.feature.model;


import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

//@Entity
//@Table(name="user")
//@NoArgsConstructor
//@Getter
//@Setter
//@RequiredArgsConstructor
//@Builder
//@AllArgsConstructor
//@ToString(callSuper = true)

@Entity
@Table(name="user" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_number", nullable = false)
    private UUID user_number; // 유저번호

    @Column(name = "user_id", nullable = false)
    private String user_id; // ID

    @Column(name = "user_password", nullable = false)
    private String user_password; // PW

    @Column(name = "user_name", nullable = false)
    private String user_name; // 이름

    @Column(name = "user_point")
    private Integer user_point; // 포인트

    @Column(name = "user_recom")
    private Integer user_recom; // 추천수

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return user_number != null && Objects.equals(user_number, user.user_number);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
