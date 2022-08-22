package project.khu.feature.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardSubjectId implements Serializable {

    private Integer subject_number;
    private Integer board_number;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BoardSubjectId that = (BoardSubjectId) o;
        return Objects.equals(subject_number, that.subject_number) && Objects.equals(board_number, that.board_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subject_number, board_number);
    }
}

