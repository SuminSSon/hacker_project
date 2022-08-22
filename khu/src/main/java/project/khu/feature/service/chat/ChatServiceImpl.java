package project.khu.feature.service.chat;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.khu.feature.model.*;
import project.khu.feature.repository.ChatContentRepository;
import project.khu.feature.repository.ChatRepository;
import project.khu.feature.repository.MemberRepository;
import project.khu.feature.repository.SubjectInfoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    @Autowired
    private ChatContentRepository chatContentRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SubjectInfoRepository subjectInfoRepository;


    /* 기능 */

    // 1. 과목명 + 교수명으로 채팅방 목록 조회
    @Override
    public List<Chat> searchChatRooms(String subject_name, String subject_professor){
        System.out.println("ChatServiceImpl.searchChatRooms");
        System.out.println(subject_name + " " + subject_professor);

        SubjectInfo temp = subjectInfoRepository.findBySubject_nameAndSubject_professor(subject_name, subject_professor);
        System.out.println("temp = " + temp);

        List<Chat> chatRooms = new ArrayList<>();
        chatRooms = chatRepository.findAllBySubject_number(temp);
        System.out.println("chatRoom = " + chatRooms);

        return chatRooms;
    }

    // 2. 유저가 속한 채팅방 목록 조회
    @Override
    public List<Chat> userChatRooms(User user_number){
        System.out.println("ChatServiceImpl.userChatRooms");
        System.out.println("user_number = " + user_number);

        List<Member> Members = memberRepository.findByUser_number(user_number);
        System.out.println("Members = " + Members);

        List<Chat> chatRooms = new ArrayList<>();
        for(Member member : Members){
//            System.out.println("member = " + member);
//            System.out.println(member.getChat_number());
            chatRooms.add(member.getChat_number());
//            System.out.println(memberRepository.findByChat_number(member.getChat_number()));
        }
        return chatRooms;
    }


    // 3. 멘토 등록(채팅방 생성) 요청
    @Override
    public Chat createChatRoom(Chat chat){
        System.out.println("ChatServiceImpl.createChatRoom");

        Chat c = new Chat();
        c.setChat_max(chat.getChat_max());
        c.setChat_mentee(chat.getChat_mentee());
        c.setSubject_number(chat.getSubject_number());
        c.setUser_tag(chat.getUser_tag());
        chatRepository.save(c);

        return c;
    }


    // 4. 멘티 신청 요청
    @Override
    public Member joinChatRoom(Member member){
        Chat byChat_number = chatRepository.findByChat_number(member.getChat_number().getChat_number());
        if(byChat_number.getChat_max() == byChat_number.getChat_mentee()){
            return null;
        }
        else {
            System.out.println("member = " + member);
            Member m = new Member();
            m.setUser_number(member.getUser_number());
            m.setChat_number(member.getChat_number());
            m.setMentor_check(member.isMentor_check());
            memberRepository.save(m);

            Integer chat_mentee = byChat_number.getChat_mentee();
            chat_mentee++;
            byChat_number.setChat_mentee(chat_mentee);
            System.out.println(byChat_number.getChat_mentee());
            chatRepository.save(byChat_number);
            return m;
        }
    }

    // 5. 멘티 취소 요청
    @Override
    public boolean outChatRoom(User user_number, Chat chat_number){
        if(memberRepository.findByUser_numberAndChat_number(user_number, chat_number) != null) {
            memberRepository.deleteByUser_numberAndChat_number(user_number, chat_number);
            chat_number.setChat_mentee(chat_number.getChat_mentee() - 1);
            chatRepository.save(chat_number);
            return true;
        }
        return false;
    }

    // 6. 채팅방 내부
    @Override
    public List<ChatContent> chatRoom(Chat chat_number) {
        List<ChatContent> byChat_number = chatContentRepository.findByChat_number(chat_number);

        return  byChat_number;
    }

    // 7. 채팅방 참가자 리스트 조회
    @Override
    public List<Member> memberList(Chat chat_number){
        List<Member> byChat_number = memberRepository.findByChat_number(chat_number);
        List<Member> memberList = new ArrayList<>();

        for(Member member : byChat_number){
            memberList.add(member);
        }

        return memberList;
    }

    // 8. 멘토 추천 수 조회
    @Override
    public User mentorRecom(Chat chat_number) {
        List<Member> byChat_number = memberRepository.findByChat_number(chat_number);

        for (Member member : byChat_number){
            if(member.isMentor_check()) {
                return member.getUser_number();
            }
        }

        return null;
    }

    // 8. 멘토 추천 수 조회
    @Override
    public User memtorRecom(Chat chat_number) {
        List<Member> byChat_number = memberRepository.findByChat_number(chat_number);

        for (Member member : byChat_number){
            if(member.isMentor_check()) {
                return member.getUser_number();
            }
        }

        return null;
    }

}
