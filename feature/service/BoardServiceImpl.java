package project.khu.feature.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.khu.feature.dto.BoardDto;
import project.khu.feature.dto.BoardSubjectDto;
import project.khu.feature.dto.CommentDto;
import project.khu.feature.dto.SubjectInfoDto;
import project.khu.feature.model.*;
import project.khu.feature.repository.BoardRepository;
import project.khu.feature.repository.BoardSubjectRepository;
import project.khu.feature.repository.CommentRepository;
import project.khu.feature.repository.SubjectInfoRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
// DB와 상호작용 해서 Create, Read, Update, Delete 등을 수행
public class BoardServiceImpl implements BoardService {

    private BoardRepository boardRepository;
    private BoardSubjectRepository boardSubjectRepository;
    private CommentRepository commentRepository;
    private SubjectInfoRepository subjectInfoRepository;

    /* Entity -> Dto 로 변환 */

    // 이때, board_number, board_date 자동생성
    private BoardDto convertBoardEntityToDto(Board board) {
        return BoardDto.builder()
                .type(board.getBoard_type())
                .title(board.getBoard_title())
                .content(board.getBoard_content())
                .user(board.getUser_number())
                .build();
    }

    private BoardSubjectDto convertBoardSubjectEntityToDto(BoardSubject boardSubject) {
        return BoardSubjectDto.builder()
                .subjectNumber(boardSubject.getSubject_number())
                .boardNumber(boardSubject.getBoard_number())
                .build();
    }


    // 이때, comments_number, comments_date 자동생성
    private CommentDto convertCommentEntityToDto(Comments comments) {
        return CommentDto.builder()
                .board_number(comments.getBoard_number())
                .comments_content(comments.getComments_content())
                .user_number(comments.getUser_number())
                .build();
    }

    // 이때, subject_number 자동생성
    private SubjectInfoDto convertSubjectInfoEntityToDto(SubjectInfo subjectInfo) {
        return SubjectInfoDto.builder()
                .subject_name(subjectInfo.getSubject_name())
                .subject_professor(subjectInfo.getSubject_professor())
                .build();
    }


    /* 기능 */

    // 1-1. 정보게시판 게시글 목록 불러오기
    // 생성된 날짜(board_date) 기준으로 오름차순(ASC) 정렬 (내림차순: DESC)
    @Transactional
    @Override
    public List<BoardDto> getBoardList() {
        List<Board> boardEntities;
        List<BoardDto> boardDtoList = new ArrayList<>();

        boardEntities = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "board_date"));

        for (Board board : boardEntities) {
            if(board.getBoard_type() == BoardType.Info) {
                boardDtoList.add(this.convertBoardEntityToDto(board));
            }
        }

        return boardDtoList;
    }

    // 1-2. 특정 과목게시판 게시글 목록들 불러오기
    // 내림차순 정렬 필요!!!!!!
    @Transactional
    @Override
    public List<BoardDto> getBoardSubjectList(SubjectInfo subjectNumber) {
        List<Board> boardNumberEntities;
        List<BoardDto> boardDtoList = new ArrayList<>();

        boardNumberEntities = Collections.singletonList(boardSubjectRepository.findAllBySubject_number(subjectNumber));

        for(Board bo : boardNumberEntities) {
            Board board = boardRepository.findByBoard_number(bo.getBoard_number());
            boardDtoList.add(this.convertBoardEntityToDto(board));
        }

        // ArrayList createdDate 를 기준으로 내림차순 정렬하기

        return boardDtoList;
    }

    // 2. 특정 게시글 불러오기
    // boardRepo 의 findByNumber 메서드로 board 게시글 내용을 가져옴
    @Transactional
    @Override
    public BoardDto getPost(Board boardNumber) {
        Board board;

        board = boardRepository.findByBoard_number(boardNumber.getBoard_number());

        BoardDto boardDto = BoardDto.builder()
                .type(board.getBoard_type())
                .title(board.getBoard_title())
                .content(board.getBoard_content())
                .user(board.getUser_number())
                .build();

        return boardDto;
    }

    // 3. 게시글 boardRepo 에 저장하기
    @Transactional
    @Override
    // PK인 board_number 가 integer 타입
    // if( subjectNumber == NULL ) -> 정보게시판
    public Integer savePost(BoardDto boardDto, SubjectInfo subjectNumber) {

        // 과목 게시판일 경우,
        if(subjectNumber != null) {
            BoardSubjectDto boardSubjectDto = BoardSubjectDto.builder()
                    .subjectNumber(subjectNumber)
                    .boardNumber(boardDto.getBoard(boardDto.getBoard_number()))
                    .build();
            boardSubjectRepository.save(boardSubjectDto.toEntity());
        }

        return boardRepository.save(boardDto.toEntity()).getBoard_number();
    }

    // 4. 과목 정보 저장하기
    // ex) 과목 번호: 1, 과목명: 객프, 교수님명: *** 교수님
    @Transactional
    @Override
    public Integer saveSubjectInfo(SubjectInfoDto subjectInfoDto) {
        return subjectInfoRepository.save(subjectInfoDto.toEntity()).getSubject_number();
    }

    // 5. 과목 정보 불러오기
    @Transactional
    @Override
    public SubjectInfoDto getSubjectInfo(Integer subjectNumber) {
        SubjectInfo subjectInfo = subjectInfoRepository.findBySubject_number(subjectNumber);

        SubjectInfoDto subjectInfoDto = this.convertSubjectInfoEntityToDto(subjectInfo);

        return subjectInfoDto;
    }

    // 6. 과목 목록 불러오기
    // ex) 객프, 자구, 컴퓨터구조
    @Transactional
    @Override
    public List<BoardSubjectDto> getSubjectList() {
        List<BoardSubject> boardSubjectEntities;
        List<BoardSubjectDto> boardSubjectDtoList = new ArrayList<>();

        boardSubjectEntities = boardSubjectRepository.findAll(Sort.by(Sort.Direction.ASC, "subject_name"));
        for(BoardSubject boardSubject : boardSubjectEntities) {
            boardSubjectDtoList.add(this.convertBoardSubjectEntityToDto(boardSubject));
        }

        return boardSubjectDtoList;
    }

    // 7. 댓글 목록 불러오기
    @Transactional
    @Override
    public List<CommentDto> getCommentList(Integer boardNumber) {
        List<Comments> commentsEntities;
        List<CommentDto> commentDtoList = new ArrayList<>();

        commentsEntities = commentRepository.findAllByBoard_number(boardNumber);
        for(Comments comments : commentsEntities) {
            commentDtoList.add(this.convertCommentEntityToDto(comments));
        }

        return commentDtoList;
    }

    // 8. 답글 commentRepo 에 저장하기
    @Transactional
    @Override
    public Board saveComment(CommentDto commentDto) {
        return commentRepository.save(commentDto.toEntity()).getBoard_number();
    }



}