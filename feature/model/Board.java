package project.khu.feature.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

//@Entity
//@Table(name="board")
//@NoArgsConstructor
//@Getter
//@Setter
//@RequiredArgsConstructor
//@Builder
//@AllArgsConstructor
//@ToString(callSuper = true)

@Entity
@Table(name="board" )
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="board_number", nullable = false)
    private UUID board_number; // 게시판 글번호 PK

    @Column(name = "board_type")
    @Enumerated(EnumType.STRING)
    private BoardType board_type; // 게시판 유형 (enum)

    @Column(name = "board_title")
    private String board_title; // 글 제목

    @Column(name = "board_content")
    private String board_content; // 글 제목

    @Column(name = "board_writer")
    private Integer board_writer; // 작성자 번호

    @Column(name = "board_date")
    @CreationTimestamp
    private LocalDateTime board_date; // 작성일자

    @ManyToOne
    @JoinColumn(name = "user_number", referencedColumnName = "user_number")
    private User user_number; // 유저 번호 FK

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Board board = (Board) o;
        return board_number != null && Objects.equals(board_number, board.board_number);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

