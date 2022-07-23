package project.khu.webapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.Board;
import project.khu.feature.model.BoardType;
import project.khu.feature.model.MemberExample;
import project.khu.feature.model.User;
import project.khu.feature.repository.BoardRepository;
import project.khu.feature.repository.MemberExampleRepository;
import project.khu.feature.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@RequestMapping(value = "/demo", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController("TestApi")
//@RequiredArgsConstructor
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;


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

    @PostMapping(path="/board/add")
    public String addNewBoard (@RequestParam BoardType type, @RequestParam String title, @RequestParam String content, @RequestParam User userNumber) {
        Board b = new Board();
        b.setBoard_type(type);
        b.setBoard_title(title);
        b.setBoard_content(content);
        b.setUser_number(userNumber);
        boardRepository.save(b);

        return "Save Board";
    }

    @GetMapping(path="/board/all")
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }


    //@SneakyThrows
    @GetMapping("/get")
    public String get(){
        return "string";
    }

}
