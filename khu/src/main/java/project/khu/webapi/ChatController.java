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
<<<<<<< HEAD

=======
        //System.out.println(chatRooms);
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
        return chatRooms;
    }

    // 2. 유저가 속한 채팅방 목록 조회
    @GetMapping("chat/user")
    public List<Chat> chatUser(Model model, @RequestParam User userNumber) {
        List<Chat> chatRooms = chatService.userChatRooms(userNumber);

        model.addAttribute("chatUser", chatRooms);
<<<<<<< HEAD

=======
        //System.out.println(chatRooms);
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
        return chatRooms;
    }

    // 3. 멘토 등록(채팅방 생성) 요청
    @PostMapping("chat/create")
<<<<<<< HEAD
    public Chat chatCreate(Model model, @RequestBody Chat chat){
        Chat c = chatService.createChatRoom(chat);

        model.addAttribute("chatCreate", c);

        return c;
=======
    public String chatCreate(Model model, @RequestParam Chat chat){
        System.out.println("ChatController.chatCreate");
        Chat c = chatService.createChatRoom(chat);

        model.addAttribute("chatCreate", c);
        return "chat/createChatRoom";
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
    }

    // 4. 멘티 신청 요청
    @PostMapping("chat/join")
<<<<<<< HEAD
    public boolean chatJoin(Model model, @RequestBody Member member){
=======
    public String chatJoin(Model model, @RequestBody Member member){
        System.out.println("ChatController.chatJoin");
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
        Member m = chatService.joinChatRoom(member);

        model.addAttribute("chatJoin", m);

<<<<<<< HEAD
        return true;
=======
        return "chat/memberJoinChat";
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
    }

    // 5. 멘티 취소 요청
    // 없는 user, chat이면 false 반환
    @GetMapping("chat/out")
    public boolean chatOut(@RequestParam User userNumber, @RequestParam Chat chatNumber){
<<<<<<< HEAD
=======
        System.out.println("ChatController.chatOut");
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
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
    public List<String> chatRoomList(Model model, @RequestParam Chat chatNumber) {
        List<String> userList = chatService.memberList(chatNumber);

        model.addAttribute("chatRoomList", userList);
        return userList;
    }
}