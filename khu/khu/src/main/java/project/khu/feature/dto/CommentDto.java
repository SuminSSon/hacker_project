package project.khu.feature.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.Board;
import project.khu.feature.model.BoardType;
import project.khu.feature.model.Comments;
import project.khu.feature.model.User;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private BoardType board_type;
    private Board board_number;    // 게시판 번호, PK
    private Integer comments_number; // 댓글 번호, PK
    private String comments_content; // 댓글 내용
    private LocalDateTime comments_date;
    private User user_number;        // 작성자 번호

    // Dto -> Entity
    public Comments toEntity() {
        Comments comments = Comments.builder()
                .board_number(board_number)           // 게시판 글번호
                .comments_content(comments_content)   // 댓글 내용
                .user_number(user_number)             // 유저 번호 (= 작성자 번호)
                .build();
        return comments;
    }

    // Dto 생성

    @Builder
    public CommentDto(Board board_number, Integer comments_number, User user_number, String comments_content, LocalDateTime comments_date) {
        this.board_number = board_number;
        this.comments_number = comments_number;
        this.comments_content = comments_content;
        this.user_number = user_number;
        this.comments_date = comments_date;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "board_number= " + board_number + '\'' +
                ", comments_number= " + comments_number + '\'' +
                ", comments_content= " + comments_content + '\'' +
                ", comments_date= " + comments_date + '\'' +
                ", user_number= " + user_number + '\'' +
                "}";
    }
}
