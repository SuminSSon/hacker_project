package project.khu.webapi;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.*;
import project.khu.feature.repository.SubjectInfoRepository;
import project.khu.feature.service.chat.ChatService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private final ChatService chatService;

    @Autowired
    private final SubjectInfoRepository subjectInfoRepository;


    // 1. 과목명 + 교수명으로 채팅방 목록 조회
    @GetMapping("chat/search")
    public List<Chat> chatSearch(Model model, @RequestParam String subjectName, @RequestParam String subjectProfessor) {
        List<Chat> chatRooms = chatService.searchChatRooms(subjectName, subjectProfessor);

        model.addAttribute("chatSearch", chatRooms);
        //System.out.println(chatRooms);
        return chatRooms;
    }

    // 2. 유저가 속한 채팅방 목록 조회
    @GetMapping("chat/user")
    public List<Chat> chatUser(Model model, @RequestParam User userNumber) {
        List<Chat> chatRooms = chatService.userChatRooms(userNumber);

        model.addAttribute("chatUser", chatRooms);
        //System.out.println(chatRooms);
        return chatRooms;
    }

    // 3. 멘토 등록(채팅방 생성) 요청
    @PostMapping("chat/create")
    public Chat chatCreate(Model model, @RequestBody Chat chat){
        System.out.println("ChatController.chatCreate");
        Chat c = chatService.createChatRoom(chat);

        model.addAttribute("chatCreate", c);
        return c;
    }

    // 4. 멘티 신청 요청
    @PostMapping("chat/join")
    public String chatJoin(Model model, @RequestBody Member member){
        System.out.println("ChatController.chatJoin");
        Member m = chatService.joinChatRoom(member);

        model.addAttribute("chatJoin", m);

        return "chat/memberJoinChat";
    }

    // 5. 멘티 취소 요청
    // 없는 user, chat이면 false 반환
    @GetMapping("chat/out")
    public boolean chatOut(@RequestParam User userNumber, @RequestParam Chat chatNumber){
        System.out.println("ChatController.chatOut");
        boolean b = chatService.outChatRoom(userNumber, chatNumber);

        return b;
    }

    // 6. 채팅방 내부
    @GetMapping("chat/room")
    public List<ChatContent> chatRoomIn (Model model, @RequestParam Chat chatNumber){
        List<ChatContent> chatContents =chatService.chatRoom(chatNumber);

        model.addAttribute("chatRoomIn", chatContents);

        return chatContents;
    }

    // 7. 채팅방 참가자 리스트 조회
    @GetMapping("chat/room/list")
    public List<Member> chatRoomList(Model model, @RequestParam Chat chatNumber) {
        List<Member> userList = chatService.memberList(chatNumber);

        model.addAttribute("chatRoomList", userList);
        return userList;
    }

    // 8. 멘토 추천 수 조회
    @GetMapping("chat/mentor")
    public User mentorRecom(Model model, @RequestParam Chat chatNumber){
        User u = chatService.mentorRecom(chatNumber);

        return u;
    }
}