package project.khu.webapi;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.Chat;
import project.khu.feature.model.Member;
import project.khu.feature.model.SubjectInfo;
import project.khu.feature.model.User;
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

    @GetMapping("chat/search")
    public List<Chat> chatSearch(@RequestBody SubjectInfo subjectInfo) {
        List<Chat> chatRooms = chatService.searchChatRooms(subjectInfo.getSubject_name(), subjectInfo.getSubject_professor());
        //System.out.println(chatRooms);
        return chatRooms;
    }

    @GetMapping("chat/user")
    public List<Chat> chatUser(@RequestBody User user) {
        List<Chat> chatRooms = chatService.userChatRooms(user);
        //System.out.println(chatRooms);
        return chatRooms;
    }

    @PostMapping("chat/create")
    public Chat chatCreate(@RequestBody Chat chat){
        System.out.println("ChatController.chatCreate");
        Chat c = chatService.createChatRoom(chat);
        return c;
    }

    @PostMapping("chat/join")
    public String chatJoin(@RequestBody Member member){
        System.out.println("ChatController.chatJoin");
        Member m = chatService.joinChatRoom(member);
        System.out.println("m = " + m);

        return "hello";
    }

}
