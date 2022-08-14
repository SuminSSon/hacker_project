package project.khu.feature.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.Board;
import project.khu.feature.model.BoardSubject;
import project.khu.feature.model.SubjectInfo;

@Data
@NoArgsConstructor
public class BoardSubjectDto{
    private SubjectInfo subject_number;   // 과목 번호
    private Board board_number;   // 게시판 글번호 PK

    // Dto -> Entity
    public BoardSubject toEntity() {
        BoardSubject boardSubject = BoardSubject.builder()
                .subject_number(subject_number) // 과목 번호
                .board_number(board_number)     // 게시판 글번호
                .build();
        return boardSubject;
    }

    // Entity -> Dto
    @Builder
    public BoardSubjectDto(SubjectInfo subjectNumber, Board boardNumber) {
        this.subject_number = subjectNumber;
        this.board_number = boardNumber;
    }
}


