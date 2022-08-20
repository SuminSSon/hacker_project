package project.khu.feature.service.chat;


import org.springframework.stereotype.Service;
import project.khu.feature.model.Chat;
import project.khu.feature.model.ChatContent;
import project.khu.feature.model.Member;
import project.khu.feature.model.User;

import java.util.List;

@Service
public interface ChatService {

    // 1. 과목명 + 교수명으로 채팅방 목록 조회
    public List<Chat> searchChatRooms(String subject_name, String subject_professor);

    // 2. 유저가 속한 채팅방 목록 조회
    public List<Chat> userChatRooms(User user_number);

    // 3. 멘토 등록(채팅방 생성) 요청
    public Chat createChatRoom(Chat chat);

    // 4. 멘티 신청 요청
    public Member joinChatRoom(Member member);

    // 5. 멘티 취소 요청
    public boolean outChatRoom(User user, Chat chat);

    // 6. 채팅방 내부
    public List<ChatContent> chatRoom(Chat chat_number);

    // 7. 채팅방 참가자 리스트 조회
    public List<String> memberList(Chat chat_number);

}
