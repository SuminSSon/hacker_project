package project.khu.feature.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.khu.feature.dto.BoardDto;
import project.khu.feature.dto.BoardSubjectDto;
import project.khu.feature.dto.CommentDto;
import project.khu.feature.dto.SubjectInfoDto;
import project.khu.feature.model.Board;
import project.khu.feature.model.SubjectInfo;

import java.util.List;

@Service
// DB와 상호작용하는 비즈니스 로직으르 수행하는 interface
public interface BoardService {


    List<BoardDto> getBoardList();

    List<BoardDto> getBoardSubjectList(SubjectInfo subjectNumber);

    BoardDto getPost(Board boardNumber);


//    // 3. 게시글 boardRepo 에 저장하기 (*)
//    @Transactional
//    // PK인 board_number 가 integer 타입
//    // if( subjectNumber == NULL ) -> 정보게시판
//    Integer savePost(BoardDto boardDto, SubjectInfo subjectNumber);


    // 3-1. [자료게시판] 게시글 boardRepo 에 저장하기
    @Transactional
    // PK인 board_number 가 integer 타입
    Integer saveInfoPost(BoardDto boardDto);

    // 3-2. [과목게시판] 게시글 boardRepo 에 저장하기
    @Transactional
    // PK인 board_number 가 integer 타입
    Integer saveSubjectPost(BoardDto boardDto, SubjectInfo subjectNumber);

    // 4. 과목 정보 저장하기 (*)
    @Transactional
    Integer saveSubjectInfo(SubjectInfoDto subjectInfoDto);

    // 5. 과목 정보 불러오기
    @Transactional
    SubjectInfoDto getSubjectInfo(Integer subjectNumber);

    List<SubjectInfoDto> getSubjectList();

    List<CommentDto> getCommentList(Integer boardNumber);

    Board saveComment(CommentDto commentDto);
}
