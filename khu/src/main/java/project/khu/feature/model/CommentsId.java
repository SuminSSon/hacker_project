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
public class CommentsId implements Serializable {

    private Integer comments_number;
    private Integer board_number;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentsId that = (CommentsId) o;
        return Objects.equals(comments_number, that.comments_number) && Objects.equals(board_number, that.board_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comments_number, board_number);
    }
}
