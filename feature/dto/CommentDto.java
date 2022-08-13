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
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private BoardType board_type;
    private Board board_number;    // 게시판 번호, PK
    private Integer comments_number; // 댓글 번호, PK
    private String comments_content; // 댓글 내용
    private LocalDateTime comments_date = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")));
    private User user_number;        // 작성자 번호

    // Dto -> Entity
    public Comments toEntity() {
        Comments comments = Comments.builder()
                .comments_number(comments_number)     // 댓글 번호
                .board_number(board_number)           // 게시판 글번호
                .comments_date(comments_date)         // 작성 일자
                .comments_content(comments_content)   // 댓글 내용
                .user_number(user_number)             // 유저 번호 (= 작성자 번호)
                .build();
        return comments;
    }

    // Entity -> Dto

    @Builder
    public CommentDto(Board board_number, User user_number, String comments_content) {
        this.board_number = board_number;
        this.comments_content = comments_content;
        this.user_number = user_number;
    }
}
