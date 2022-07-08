package project.khu.feature.model;


import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

//@Entity
//@Table(name="board_subject")
//@NoArgsConstructor
//@Getter
//@Setter
//@RequiredArgsConstructor
//@Builder
//@AllArgsConstructor
//@ToString(callSuper = true)
//@IdClass(BoardSubjectId.class)

@Entity
@Table(name="board_subject" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(BoardSubjectId.class)
public class BoardSubject {

    @Id
    @ManyToOne
    @JoinColumn(name = "subject_number", referencedColumnName = "subject_number")
    private SubjectInfo subject_number;

    @Id
    @ManyToOne
    @JoinColumn(name = "board_number", referencedColumnName = "board_number")
    private Board board_number;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BoardSubject that = (BoardSubject) o;
        return subject_number != null && Objects.equals(subject_number, that.subject_number)
                && board_number != null && Objects.equals(board_number, that.board_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subject_number, board_number);
    }
}
