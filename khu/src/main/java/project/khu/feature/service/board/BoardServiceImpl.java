package project.khu.feature.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.khu.feature.dto.BoardDto;
import project.khu.feature.dto.BoardSubjectDto;
import project.khu.feature.dto.CommentDto;
import project.khu.feature.dto.SubjectInfoDto;
import project.khu.feature.model.*;
import project.khu.feature.repository.BoardRepository;
import project.khu.feature.repository.BoardSubjectRepository;
import project.khu.feature.repository.CommentsRepository;
import project.khu.feature.repository.SubjectInfoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
// DB와 상호작용 해서 Create, Read, Update, Delete 등을 수행
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardSubjectRepository boardSubjectRepository;
    private final CommentsRepository commentRepository;
    private final SubjectInfoRepository subjectInfoRepository;

    /* Entity -> Dto 로 변환 */

    // 이때, board_number, board_date 자동생성
    private BoardDto convertBoardEntityToDto(Board board) {
        return BoardDto.builder()
                .number(board.getBoard_number())
                .type(board.getBoard_type())
                .title(board.getBoard_title())
                .content(board.getBoard_content())
                .user(board.getUser_number())
                .date(board.getBoard_date())
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
                .comments_number(comments.getComments_number())
                .comments_date(comments.getComments_date())
                .comments_content(comments.getComments_content())
                .user_number(comments.getUser_number())
                .build();
    }

    // 이때, subject_number 자동생성
    private SubjectInfoDto convertSubjectInfoEntityToDto(SubjectInfo subjectInfo) {
        return SubjectInfoDto.builder()
                .subject_number(subjectInfo.getSubject_number())
                .subject_name(subjectInfo.getSubject_name())
                .subject_professor(subjectInfo.getSubject_professor())
                .build();
    }


    /* 기능 */

    // 1-1. 자료게시판 게시글 목록 불러오기
    // 생성된 날짜(board_date) 기준으로 오름차순(ASC) 정렬 (내림차순: DESC)
    @Transactional
    @Override
    public List<BoardDto> getBoardList() {
        System.out.println("----------getBoardList In-----------");
        List<Board> boardEntities;
        List<BoardDto> boardDtoList = new ArrayList<>();

        boardEntities = boardRepository.findAll();

        System.out.println("======= add =======");
        for (Board board : boardEntities) {
            if(board.getBoard_type() == BoardType.Info)
                boardDtoList.add(this.convertBoardEntityToDto(board));
        }

        return boardDtoList;
    }

    // 1-2. 특정 과목게시판 게시글 목록들 불러오기
    // 내림차순 정렬 필요!!!!!!
    @Transactional
    @Override
    public List<BoardDto> getBoardSubjectList(SubjectInfo subjectNumber) {
        List<BoardSubject> boardSubjectList;
        List<Board> boardNumberEntities = new ArrayList<>();
        List<BoardDto> boardDtoList = new ArrayList<>();


        System.out.println("--------getBoardSubjectList in------------");
        System.out.println(subjectNumber);
        boardSubjectList = boardSubjectRepository.findAll();

        for(BoardSubject boardSubject: boardSubjectList) {
            if(boardSubject.getSubject_number() == subjectNumber) {
                boardNumberEntities.add(boardSubject.getBoard_number());
            }
        }

        System.out.println("=======board Repo 에 저장=======");
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
        BoardDto boardDto = convertBoardEntityToDto(board);

        return boardDto;
    }

    // 3-1. [자료게시판] 게시글 boardRepo 에 저장하기
    @Transactional
    @Override
    // PK인 board_number 가 integer 타입
    // if( subjectNumber == NULL ) -> 정보게시판
    public Integer saveInfoPost(BoardDto boardDto) {

        System.out.println("---------Save Post boardDto---------");
        System.out.println(boardDto);

        System.out.println("-------------boardEntity-----------");
        Board board = boardRepository.save(boardDto.toEntity());
        System.out.println(board);

        return board.getBoard_number();
    }

    // 3-2. [과목게시판] 게시글 boardRepo 에 저장하기
    @Transactional
    @Override
    // PK인 board_number 가 integer 타입
    // if( subjectNumber == NULL ) -> 정보게시판
    public Integer saveSubjectPost(BoardDto boardDto, SubjectInfo subjectInfo) {

//        System.out.println("---------Save Subject Post---------");
//        System.out.println(boardDto);
//        System.out.println(subjectInfo);

        Board board = boardRepository.save(boardDto.toEntity());

        BoardSubjectDto boardSubjectDto = BoardSubjectDto.builder()
                .subjectNumber(subjectInfo)
                .boardNumber(board)
                .build();
//        System.out.println("-----boardSubjectDto--------");
        boardSubjectRepository.save(boardSubjectDto.toEntity());

        return board.getBoard_number();
    }

    // 4. 과목 정보 저장하기
    // ex) 과목 번호: 1, 과목명: 객프, 교수님명: *** 교수님
    @Transactional
    @Override
    public Integer saveSubjectInfo(SubjectInfoDto subjectInfoDto) {
//        System.out.println("in");
//        System.out.println(subjectInfoDto);
//        System.out.println(subjectInfoDto.toEntity());
//        System.out.println("----------------------------------------------");
//        System.out.println(subjectInfoRepository.save(subjectInfoDto.toEntity()).getSubject_number());
//        System.out.println("-------------------------------------------");

        return subjectInfoRepository.save(subjectInfoDto.toEntity()).getSubject_number();
    }

    // 5. 과목 정보 불러오기
    @Transactional
    @Override
    public SubjectInfoDto getSubjectInfo(Integer subjectNumber) {
        SubjectInfo subjectInfo = subjectInfoRepository.findBySubject_number(subjectNumber);

        SubjectInfoDto subjectInfoDto = this.convertSubjectInfoEntityToDto(subjectInfo);
        System.out.println("---------Subject Info----------");
        System.out.println(subjectInfoDto.getSubject_number());
        System.out.println(subjectInfoDto.getSubject_name());
        System.out.println(subjectInfoDto.getSubject_professor());

        return subjectInfoDto;
    }

    // 6. 과목 목록 불러오기
    // ex) 객프, 자구, 컴퓨터구조
    @Transactional
    @Override
    public List<SubjectInfoDto> getSubjectList() {

        List<SubjectInfo> subjectInfoEntities;
        List<SubjectInfoDto> SubjectInfoDtoList = new ArrayList<>();

        subjectInfoEntities = subjectInfoRepository.findAll();  // Sort.by(Sort.Direction.ASC, "subject_name")
        System.out.println("--------------SUBJECT LIST----------------");
        for(SubjectInfo subjectInfo : subjectInfoEntities) {
            SubjectInfoDtoList.add(this.convertSubjectInfoEntityToDto(subjectInfo));
            System.out.println(this.convertSubjectInfoEntityToDto(subjectInfo));
        }

        return SubjectInfoDtoList;
    }

//    // 6. 과목 목록 불러오기
//    // ex) 객프, 자구, 컴퓨터구조
//    @Transactional
//    @Override
//    public List<BoardSubjectDto> getSubjectList() {
//        List<BoardSubject> boardSubjectEntities;
//        List<BoardSubjectDto> boardSubjectDtoList = new ArrayList<>();
//
//        boardSubjectEntities = boardSubjectRepository.findAll(Sort.by(Sort.Direction.ASC, "subject_name"));
//        for(BoardSubject boardSubject : boardSubjectEntities) {
//            boardSubjectDtoList.add(this.convertBoardSubjectEntityToDto(boardSubject));
//        }
//
//        return boardSubjectDtoList;
//    }

    // 7. 댓글 목록 불러오기
    @Transactional
    @Override
    public List<CommentDto> getCommentList(Board boardNumber) {
        List<Comments> commentsEntities;
        List<CommentDto> commentDtoList = new ArrayList<>();

        System.out.println("-------get Comment List--------");
        commentsEntities = commentRepository.findAll();
        for(Comments comments : commentsEntities) {
            if(comments.getBoard_number() == boardNumber) {
                System.out.println(comments);
                commentDtoList.add(this.convertCommentEntityToDto(comments));
            }
        }

        return commentDtoList;
    }

    // 8. 답글 commentRepo 에 저장하기
    @Transactional
    @Override
    public Board saveComment(CommentDto commentDto) {
        System.out.println("-------save Comment---------");
        Comments comments = commentRepository.save(commentDto.toEntity());
        System.out.println(comments);
        System.out.println(comments.getBoard_number());
        return comments.getBoard_number();
    }


}