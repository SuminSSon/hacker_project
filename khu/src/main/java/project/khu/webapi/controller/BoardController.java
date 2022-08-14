package project.khu.webapi.controller;

// 모든 사용자의 요청은 Controller 를 통해 분기 처리
// View 로부터 받은 사용자의 요청을 Service 에게 요청하며,
// Service 는 내부 비즈니스 로직을 담당

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.dto.CommentDto;
import project.khu.feature.model.Board;
import project.khu.feature.model.SubjectInfo;
import project.khu.feature.dto.BoardDto;
import project.khu.feature.model.User;
import project.khu.feature.repository.UserRepository;
import project.khu.feature.service.BoardService;
import project.khu.feature.model.BoardType;
import project.khu.feature.dto.SubjectInfoDto;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("board")
public class BoardController {

    private final UserRepository userRepository;
    private final BoardService boardService;

    // 1-1. 자료게시판 게시글 목록 불러오기 (*)
    // ex) [1] spring boot 란? [2] 1일 1커밋 효과적으로 활용하기
    // @RequestParam(value="boardType", defaultValue = "1") BoardType boardType
    @GetMapping({"/info/post/list"})
    public String boardList(Model model) {
        List<BoardDto> boardList = boardService.getBoardList();
        System.out.println(boardList);

        model.addAttribute("boardList", boardList);

        return "board/boardList";
    }

    // 1-2. 특정 과목게시판 게시글 목록 불러오기 (*)
    // ex) [객체지향] [1] 9/23일 과제 질문 [2] ...
    @GetMapping({"/subject/post/list"})
    public String boardSubjectList(Model model, @RequestParam("subjectNumber") SubjectInfo subjectNumber) {
        List<BoardDto> boardSubjectList = boardService.getBoardSubjectList(subjectNumber);

        model.addAttribute("boardSubjectList", boardSubjectList);

        return "board/boardSubjectList";
    }

    // 2-1. [자료게시판] 특정 게시글 상세 보기 (*)
    @GetMapping({"/info/post/detail"})
    public String readInfoPost(@RequestParam Board boardNumber, Model model) {
        BoardDto boardDto = boardService.getPost(boardNumber);

        System.out.println(boardDto);

        model.addAttribute("boardDto", boardDto);
        return "board/readPost";
    }

    // 2-2. [과목게시판] 특정 게시글 상세 보기 (*)
    @GetMapping({"/subject/post/detail"})
    public String readSubjectPost(@RequestParam Board boardNumber, Model model) {
        BoardDto boardDto = boardService.getPost(boardNumber);

        System.out.println(boardDto);
        model.addAttribute("boardDto", boardDto);
        return "board/readPost";
    }

    // --------user 값 생성------------------------------
    @PostMapping(path="/user/add")
    public String addNewUser (@RequestParam String id, @RequestParam String password, @RequestParam String name) {
        User u = new User();
        u.setUser_id(id);
        u.setUser_password(password);
        u.setUser_name(name);
        userRepository.save(u);

        return "Save User";
    }

    @GetMapping(path="/user/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    //---------------------------------------------------

    // 3-1. [자료게시판] 게시글 쓰는 페이지 (*)
    @GetMapping({"/info/post"})
    public String writeInfoPost() {
        return "board/info/write";
    }

//    // 3-1-1. [자료게시판] 게시글 DB에 저장
//    // subjectNumber default 값 null
//    @PostMapping({"/info/post"})
//    public String addNewInfoPost(@RequestBody BoardDto boardDto) {
//        System.out.println(boardDto);
//        boardService.saveInfoPost(boardDto);
//        return "redirect:/board/boardList";
//    }

    // 3-1-2. [자료게시판] 게시글 DB에 저장 (*)
    @PostMapping({"/info/post/test"})
    public String addNewPost(@RequestParam String title, @RequestParam String content, @RequestParam User userNumber) {
        BoardDto boardDto = BoardDto.builder()
                .type(BoardType.Info)
                .title(title)
                .content(content)
                .user(userNumber)
                .build();
        boardService.saveInfoPost(boardDto);
        System.out.println(boardDto.getBoard_date());
        return "redirect:/board/boardList";
    }

    // 3-2. [과목게시판] 게시글 쓰는 페이지 (*)
    @GetMapping({"/subject/post"})
    public String writeSubjectPost(Model model, Integer subjectNumber) {
        SubjectInfoDto subjectInfoDto = boardService.getSubjectInfo(subjectNumber);

        model.addAttribute("subjectInfoDto",subjectInfoDto);
        return "board/subject/write";
    }

//    // 3-2-1. [정보게시판] 게시글 DB에 저장
//    @PostMapping({"/subject/post"})
//    public String addNewSubjectPost(BoardDto boardDto, @RequestParam("subjectNumber") SubjectInfo subjectNumber) {
//        boardService.saveSubjectPost(boardDto, subjectNumber);
//        return "redirect:/board/boardSubjectList";
//    }

    // 3-2-2. [정보게시판] 게시글 DB에 저장 (*)
    @PostMapping({"/subject/test"})
    public String addNewSubjectPost(@RequestParam String title, @RequestParam String content, @RequestParam User userNumber, @RequestParam("subjectNumber") SubjectInfo subjectNumber) {

        BoardDto boardDto = BoardDto.builder()
                .type(BoardType.Subject)
                .title(title)
                .content(content)
                .user(userNumber)
                .build();

        boardService.saveSubjectPost(boardDto, subjectNumber);
        return "redirect:/board/boardSubjectList";
    }

    // 4. [과목게시판] 과목 정보 저장하기 (*)
    @PostMapping({"/subject/info"})
    public @ResponseBody String addSubjectInfo(@RequestBody SubjectInfoDto subjectInfoDto) {
        System.out.println(subjectInfoDto);
        boardService.saveSubjectInfo(subjectInfoDto);
        return "board/subjectInfo";
    }

    // 5. [과목게시판] 과목 정보 불러오기 (*)
    @GetMapping({"/subject/info"})
    public String SubjectInfo(Model model, @RequestParam("subjectNumber") Integer subjectNumber) {
        SubjectInfoDto subjectInfo = boardService.getSubjectInfo(subjectNumber);

        model.addAttribute("subjectInfo", subjectInfo);
        return "board/subjectInfo";
    }

    // 6. [과목게시판] 과목 목록 불러오기 (*)
    //    ex) 객프, 자료구조, 이산구조, 컴퓨터구조,,,,
    @GetMapping("/subject/list")
    public String subjectList(Model model) {
        List<SubjectInfoDto> subjectList = boardService.getSubjectList();


        model.addAttribute("subjectList", subjectList);
        return "board/subjectList";
    }

    /* comment */

//    // 7-1-1. [자료게시판] 댓글 불러오기
//    @GetMapping({"/info/comment/list"})
//    public String infoCommentList(Model model, BoardDto boardDto) {
//        List<CommentDto> commentList = boardService.getCommentList(boardDto.getBoard_number());
//
//        model.addAttribute("infoCommentList",commentList);
//        return "board/infoCommentList";
//    }
//
//    // 7-1-2. [자료게시판] 댓글 불러오기
//    @GetMapping({"/info/comment/list"})
//    public String infoCommentList(Model model, @RequestParam String title, @RequestParam String content, @RequestParam User userNumber) {
//        BoardDto boardDto = BoardDto.builder()
//                .type(BoardType.Info)
//                .title(title)
//                .content(content)
//                .user(userNumber)
//                .build();
//
//        List<CommentDto> commentList = boardService.getCommentList(boardDto.getBoard_number());
//
//        System.out.println(commentList);
//
//        model.addAttribute("infoCommentList",commentList);
//        return "board/infoCommentList";
//    }
//
////    // 7-2-1. [과목게시판] 댓글 불러오기
////    @GetMapping({"/subject/comment/list"})
////    public String subjectCommentList(Model model, BoardDto boardDto) {
////        List<CommentDto> commentList = boardService.getCommentList(boardDto.getBoard_number());
////
////        model.addAttribute("subjectCommentList",commentList);
////        return "board/subjectCommentList";
////    }
//
//    // 7-2-2. [과목게시판] 댓글 불러오기
//    @GetMapping({"/subject/comment/list"})
//    public String subjectCommentList(Model model, @RequestParam String title, @RequestParam String content, @RequestParam User userNumber) {
//        BoardDto boardDto = BoardDto.builder()
//                .type(BoardType.Subject)
//                .title(title)
//                .content(content)
//                .user(userNumber)
//                .build();
//
//        List<CommentDto> commentList = boardService.getCommentList(boardDto.getBoard_number());
//
//        System.out.println(commentList);
//
//        model.addAttribute("subjectCommentList",commentList);
//        return "board/subjectCommentList";
//    }
//
//    // 8. [자료게시판] 댓글 작성하기
//    @PostMapping({"/info/comment/write"})
//    public String addNewInfoComment(@RequestBody CommentDto commentDto) {
//        boardService.saveComment(commentDto);
//
//        return "board/infoComment";
//    }
//
//    // 8. [과목게시판] 댓글 작성하기
//    @PostMapping({"/subject/comment/write"})
//    public String addNewSubjectComment(@RequestBody CommentDto commentDto) {
//        System.out.println(commentDto);
////        boardService.saveComment(commentDto);
//
//        return "board/subjectComment";
//    }
}