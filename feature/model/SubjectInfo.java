package project.khu.feature.model;


import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

//@Entity
//@Table(name="subject_info")
//@NoArgsConstructor
//@Getter
//@Setter
//@RequiredArgsConstructor
//@Builder
//@AllArgsConstructor
//@ToString(callSuper = true)

@Entity
@Table(name="subject_info" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class SubjectInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="subject_number", nullable = false)
    private UUID subject_number; // 과목 번호 PK

    @Column(name = "subject_name")
    private String subject_name; // 과목명

    @Column(name = "subject_professor")
    private String subject_professor; // 교수명

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SubjectInfo that = (SubjectInfo) o;
        return subject_number != null && Objects.equals(subject_number, that.subject_number);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
