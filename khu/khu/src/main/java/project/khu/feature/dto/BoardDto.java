package project.khu.feature.dto;

// data transfer object 란 각 계층 간 데이터 교환을 위한 객체
// Front <-> Controller <-> Service 간 데이터를 주고 받을 때는 DTO 객체를 통해 주고 받음

// DB 로부터 데이터를 얻어 Service, Controller 등으로 보낼 때 사용
// 별도의 Logic 을 갖지 않고, 순수 getter, setter 메서드만 가짐

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import project.khu.feature.model.Board;
import project.khu.feature.model.BoardType;
import project.khu.feature.model.User;
import project.khu.feature.repository.BoardRepository;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class    BoardDto {
    private User user_number;       // 유저 번호 == 작성자
    private Integer board_number;   // 게시판 글번호 PK
    private BoardType board_type;     // 게시판 유형
    private String board_title;     // 글 제목
    private String board_content;   // 글 내용
    private LocalDateTime board_date;  // 게시글 작성일자

    // Dto -> Entity
    public Board toEntity() {
        Board board = Board.builder()
                .board_type(board_type)         // 게시판 유형
                .board_title(board_title)       // 글 제목
                .board_content(board_content)   // 글 내용
                .user_number(user_number)       // 작성자 번호
                .build();
        return board;
    }

    // Dto 생성
    @Builder
    public BoardDto(User user, Integer number, BoardType type, String title, String content, LocalDateTime date) {
        this.board_number = number;
        this.board_type = type;
        this.board_title = title;
        this.board_content = content;
        this.user_number = user;
        this.board_date = date;
    }

    @Autowired
    private BoardRepository repository;
    public Board getBoard(Integer board_number) {
        Board board1 = repository.findByBoard_number((board_number));
        return board1;
    }

    @Override
    public String toString() {
        return "BoardDto{" +
                "board_number= " + board_number + '\'' +
                ", board_type= " + board_type + '\'' +
                ", board_date= " + board_date + '\'' +
                ", board_title= " + board_title + '\'' +
                ", board_content= " + board_content + '\'' +
                ", user_number= " + user_number + '\'' +
                "}";
    }
}

