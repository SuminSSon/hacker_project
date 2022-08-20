package project.khu.webapi;

import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.PartHttpMessageWriter;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.*;
import project.khu.feature.repository.*;

import java.security.Key;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/demo", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController("TestApi")
//@RequiredArgsConstructor
public class Controller {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private SubjectInfoRepository subjectInfoRepository;
    @Autowired
    private BoardSubjectRepository boardSubjectRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ChatContentRepository chatContentRepository;


//    @PostMapping(path="/user/add")
//    public String addNewUser (@RequestParam String id, @RequestParam String password, @RequestParam String name) {
//        User u = new User();
//        u.setUser_id(id);
//        u.setUser_password(password);
//        u.setUser_name(name);
//        userRepository.save(u);
//
//        return "Save User";
//    }
//
//    @GetMapping(path="/user/all")
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }

    @PostMapping(path="/subject/info/add")
    public String addSubjectInfo1 (@RequestParam String subject_name, @RequestParam String subject_professor) {
        SubjectInfo s = new SubjectInfo();
        s.setSubject_name(subject_name);
        s.setSubject_professor(subject_professor);
        subjectInfoRepository.save(s);

        return "Save subject info";
    }

    @PostMapping(path="/board/subject/add")
    public String addNewBoard1 (@RequestParam String title, @RequestParam String content, @RequestParam User userNumber) {
        Board b = new Board();
        b.setBoard_type(BoardType.Subject);
        b.setBoard_title(title);
        b.setBoard_content(content);
        b.setUser_number(userNumber);
        boardRepository.save(b);

        return "Save Board";
    }

    @PostMapping(path="/boardSubject/add")
    public String addNewSubjectBoard1 (@RequestParam SubjectInfo subject_number, @RequestParam Board board_number) {
        BoardSubject b = new BoardSubject();
        b.setSubject_number(subject_number);
        b.setBoard_number(board_number);
        boardSubjectRepository.save(b);

        return "Save BoardSubject";
    }

    @GetMapping(path="/board/all")
    public List<Board> getAllBoard1() {
        return boardRepository.findAll();
    }


    @PostMapping(path="/comments/add")
    public String addNewComments1 (@RequestParam Board board_number, @RequestParam Integer comments_writer, @RequestParam User user_number, @RequestParam String comments_content) {
        Comments c = new Comments();
        c.setBoard_number(board_number);
        c.setComments_content(comments_content);
        c.setUser_number(user_number);
        commentsRepository.save(c);

        return "Save Comments";
    }

    @GetMapping(path="/comments/all")
    public List<Comments> getAllComments1() {
        return commentsRepository.findAll();
    }

    @PostMapping(path="/chat/add")
    public String chatAdd1(@RequestParam Integer chat_max, @RequestParam Integer chat_mentee, @RequestParam SubjectInfo subject_number, @RequestParam String  user_tag){
        Chat c = new Chat();
        c.setChat_max(chat_max);
        c.setChat_mentee(chat_mentee);
        c.setSubject_number(subject_number);
        c.setUser_tag(user_tag);
        chatRepository.save(c);

        return "Save chat add";
    }

    @PostMapping(path="/chat/member/join")
    public String chatMemberAdd1(@RequestParam User user_number, @RequestParam Chat chat_number, @RequestParam boolean chat_mentee){
        Member m = new Member();
        m.setUser_number(user_number);
        m.setChat_number(chat_number);
        m.setChat_mentee(chat_mentee);
        memberRepository.save(m);

        return "Save Chat member join";
    }

//    @PostMapping(path="/chat/content/add")
//    public String chatContentAdd1(@RequestParam User user_number, @RequestParam String chat_content, @RequestParam Chat chat_number){
//        ChatContent c = new ChatContent();
//        c.setUser_number(user_number);
//        c.setChat_content(chat_content);
//        c.setChat_number(chat_number);
//        chatContentRepository.save(c);
//
//        return "Save chat content add";
//    }


        //@SneakyThrows
    @GetMapping("/get")
    public String get(){
        return "string";
    }

}
