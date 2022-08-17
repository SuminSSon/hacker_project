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
    public String chatSearch(Model model, @RequestBody SubjectInfo subjectInfo) {
        List<Chat> chatRooms = chatService.searchChatRooms(subjectInfo.getSubject_name(), subjectInfo.getSubject_professor());

        model.addAttribute("chatSearch", chatRooms);
        //System.out.println(chatRooms);
        return "chat/chatSearchList";
    }

    // 2. 유저가 속한 채팅방 목록 조회
    @GetMapping("chat/user")
    public String chatUser(Model model, @RequestBody User user) {
        List<Chat> chatRooms = chatService.userChatRooms(user);

        model.addAttribute("chatUser", chatRooms);
        //System.out.println(chatRooms);
        return "chat/chatUserList";
    }

    // 3. 멘토 등록(채팅방 생성) 요청
    @PostMapping("chat/create")
    public String chatCreate(Model model, @RequestBody Chat chat){
        System.out.println("ChatController.chatCreate");
        Chat c = chatService.createChatRoom(chat);

        model.addAttribute("chatCreate", c);
        return "chat/createChatRoom";
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
    @GetMapping("chat/out")
    public String chatOut(@RequestBody Member member){
        System.out.println("ChatController.chatOut");
        chatService.outChatRoom(member);

        return "chat/memberOutChat";
    }

    // 6. 채팅방 내부
    @GetMapping("chat/room")
    public String chatRoomIn (Model model, @RequestBody Chat chat_number){
        List<ChatContent> chatContents =chatService.chatRoom(chat_number);

        model.addAttribute("chatRoomIn", chatContents);

        return "chat/chatRoomContents";
    }

    // 7. 채팅방 참가자 리스트 조회
    @GetMapping("chat/room/list")
    public String chatRoomList(Model model, @RequestBody Chat chat_number) {
        List<String> userList = chatService.memberList(chat_number);

        model.addAttribute("chatRoomList", userList);
        return "chat/room/chatRoomList";
    }
}