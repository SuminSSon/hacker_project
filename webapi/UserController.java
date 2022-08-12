package project.khu.webapi;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.User;
import project.khu.feature.repository.UserRepository;
import project.khu.feature.service.User.config.auth.PrincipalDetails;

import java.util.List;


@RestController
@RequiredArgsConstructor
//@RequestMapping(value = "/user")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 모든 사람이 접근 가능
    @GetMapping("home")
    public String home() {
        return "<h1>home</h1>";
    }

    // Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용 불가능.
    // 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.

    // 유저 혹은 매니저 혹은 어드민이 접근 가능
    @GetMapping("api/v1/user")
    public String user(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principal Id : "+principal.getUser().getUser_id());
        System.out.println("principal Username : "+principal.getUser().getUser_name());
        System.out.println("principal Password : "+principal.getUser().getUser_password());

        return "<h1>user</h1>";
    }

    // 매니저 혹은 어드민이 접근 가능
    @GetMapping("api/v1/user/manager/reports")
    public String reports() {
        return "<h1>reports</h1>";
    }

    // 어드민이 접근 가능
    @GetMapping("admin/users")
    public List<User> users(){
        return userRepository.findAll();
    }

    @PostMapping("join")
    public String join(@RequestBody User user) {
        user.setUser_id(user.getUser_id());
        user.setUser_password(bCryptPasswordEncoder.encode(user.getUser_password()));
        user.setUser_name(user.getUser_name());
        user.setUser_roles("ROLE_USER");
        userRepository.save(user);
        return "회원가입완료";
    }

}
