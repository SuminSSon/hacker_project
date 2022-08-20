package project.khu.webapi;

// 모든 사용자의 요청은 Controller 를 통해 분기 처리
// View 로부터 받은 사용자의 요청을 Service 에게 요청하며,
// Service 는 내부 비즈니스 로직을 담당

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.dto.CommentDto;
import project.khu.feature.model.*;
import project.khu.feature.dto.BoardDto;
import project.khu.feature.repository.UserRepository;
import project.khu.feature.dto.SubjectInfoDto;
import project.khu.feature.service.board.BoardService;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/board", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoardController {
    private final BoardService boardService;


    //* subjectInfo *//

    // 1. [과목게시판] 과목 정보 저장하기 (*)
    @PostMapping({"/subject/info"})
    public @ResponseBody String addSubjectInfo(@RequestBody SubjectInfoDto subjectInfoDto) {
        System.out.println("------과목 정보 저장--------");
        System.out.println(subjectInfoDto);
        boardService.saveSubjectInfo(subjectInfoDto);
        return "board/subjectInfo";
    }

    // 2. [과목게시판] 과목 정보 불러오기 (*)
    @GetMapping({"/subject/info"})
    public SubjectInfoDto subjectInfo(Model model, @RequestParam("subjectNumber") Integer subjectNumber) {
        SubjectInfoDto subjectInfo = boardService.getSubjectInfo(subjectNumber);

        System.out.println("------과목 정보 불러오기--------");
        System.out.println(subjectInfo);
        model.addAttribute("subjectInfo", subjectInfo);
        return subjectInfo;
    }

    // 3. [과목게시판] 과목 목록 불러오기 (*)
    //    ex) 객프, 자료구조, 이산구조, 컴퓨터구조,,,,
    @GetMapping("/subject/list")
    public List<SubjectInfoDto> subjectList(Model model) {
        List<SubjectInfoDto> subjectList = boardService.getSubjectList();

        model.addAttribute("subjectList", subjectList);
        return subjectList;
    }




    //* Board *//

    // 4-1. [자료게시판] 게시글 DB에 저장 (*)
    @PostMapping({"/info/post"})
    public String addNewPost(@RequestBody Board board) {
        BoardDto boardDto = BoardDto.builder()
                .type(BoardType.Info)
                .title(board.getBoard_title())
                .content(board.getBoard_content())
                .user(board.getUser_number())
                .build();
        boardService.saveInfoPost(boardDto);
        System.out.println(boardDto);

        return "redirect:/board/boardInfoList";
    }

    // 4-2. [과목게시판] 게시글 DB에 저장 (*)
    @PostMapping({"/subject/post"})
    public String addNewSubjectPost(@RequestBody Board board, @RequestParam SubjectInfo subjectNumber) {

        BoardDto boardDto = BoardDto.builder()
                .type(BoardType.Subject)
                .title(board.getBoard_title())
                .content(board.getBoard_content())
                .user(board.getUser_number())
                .build();

        boardService.saveSubjectPost(boardDto, subjectNumber);
        return "redirect:/board/boardSubjectList";
    }

    // 5-1. [자료게시판] 게시글 목록 불러오기 (*)
    // ex) [1] spring boot 란? [2] 1일 1커밋 효과적으로 활용하기

    @GetMapping({"/info/post/list"})
    public List<BoardDto> boardList(Model model) {
        List<BoardDto> boardList = boardService.getBoardList();
        System.out.println(boardList);

        model.addAttribute("boardList", boardList);

        return boardList;
    }

    // 5-2. [과목게시판] 게시글 목록 불러오기 (*)
    // ex) [객체지향] [1] 9/23일 과제 질문 [2] ...

    @GetMapping({"/subject/post/list"})
    public List<BoardDto> boardSubjectList(Model model, @RequestParam String subjectName) {
        List<BoardDto> boardSubjectList = boardService.getBoardSubjectList(subjectName);

        System.out.println(boardSubjectList);
        model.addAttribute("boardSubjectList", boardSubjectList);

        return boardSubjectList;
    }

    // 6-1. [자료게시판] 특정 게시글 상세 보기 (*)

    @GetMapping({"/info/post/detail"})
    public BoardDto readInfoPost(@RequestParam Board boardNumber, Model model) {
        BoardDto boardDto = boardService.getPost(boardNumber);

        System.out.println(boardDto);

        model.addAttribute("boardDto", boardDto);
        return boardDto;
    }

    // 6-2. [과목게시판] 특정 게시글 상세 보기 (*)
    // 댓글 api 따로 호출 필요

    @GetMapping({"/subject/post/detail"})
    public BoardDto readSubjectPost(@RequestParam Board boardNumber, Model model) {
        BoardDto boardDto = boardService.getPost(boardNumber);

        System.out.println(boardDto);
        model.addAttribute("boardDto", boardDto);

        return boardDto;
    }




    //* comment *//

    // 7-1. [자료게시판] 댓글 작성하기 (*)
    @PostMapping({"/info/comment/write"})
    public @ResponseBody String addNewInfoComment(@RequestBody Comments comments) {
        CommentDto commentDto = CommentDto.builder()
                        .board_number(comments.getBoard_number())
                                .user_number(comments.getUser_number())
                                        .comments_content(comments.getComments_content())
                                                .build();

        boardService.saveComment(commentDto);

        return "redirect:/board/info/post/detail";
    }

    // 7-2. [과목게시판] 댓글 작성하기 (*)
    @PostMapping({"/subject/comment/write"})
    public String addNewSubjectComment(@RequestBody Comments comments) {
        CommentDto commentDto = CommentDto.builder()
                .board_number(comments.getBoard_number())
                .user_number(comments.getUser_number())
                .comments_content(comments.getComments_content())
                .build();

        boardService.saveComment(commentDto);

        return "redirect:/board/subject/post/detail";
    }

    // 8-1. [자료게시판] 댓글 불러오기 (*)
    @GetMapping({"/info/comment/list"})
    public List<CommentDto> infoCommentList(Model model, @RequestParam Board boardNumber) {

        List<CommentDto> commentList = boardService.getCommentList(boardNumber);

        model.addAttribute("infoCommentList",commentList);

        return commentList;
    }

    // 8-2. [과목게시판] 댓글 불러오기 (*)
    @GetMapping({"/subject/comment/list"})
    public List<CommentDto> subjectCommentList(Model model, @RequestParam Board boardNumber) {

        List<CommentDto> commentList = boardService.getCommentList(boardNumber);

        model.addAttribute("subjectCommentList",commentList);

        return commentList;
    }

}