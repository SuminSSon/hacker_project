package project.khu.feature.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="comments" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(CommentsId.class)
public class Comments{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="comments_number", nullable = false)
    private Integer comments_number; // 댓글 번호 PK

    @Id
    @ManyToOne
    @JoinColumn(name = "board_number", referencedColumnName = "board_number")
    private Board board_number; // 게시판 글 번호 FK, PK

    @Column(name = "comments_date")
    @CreationTimestamp
    private LocalDateTime comments_date; // 작성일자

    @Column(name = "comments_content")
    private String comments_content; // 댓글 내용

    @ManyToOne
    @JoinColumn(name = "user_number", referencedColumnName = "user_number")
    private User user_number; // 유저 번호 FK

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Comments comments = (Comments) o;
        return comments_number != null && Objects.equals(comments_number, comments.comments_number)
                && board_number != null && Objects.equals(board_number, comments.board_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comments_number, board_number);
    }
}
