package project.khu.webapi;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.khu.feature.model.User;
import project.khu.feature.service.User.UserService;
import project.khu.feature.service.User.mail.MailSendService;
import project.khu.feature.service.User.config.auth.PrincipalDetails;

import java.util.List;


@RestController
@RequiredArgsConstructor
//@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private MailSendService mailService;

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

    // 어드민이 접근 가능
    @GetMapping("admin/users")
    public String users(Model model){
        List<User> users = userService.allUserInfo();

        model.addAttribute("users", users);
        return "admin/allUsers";
    }

    @PostMapping("join")
    public boolean join(@RequestBody User user) {
        return userService.join(user);
    }

    @GetMapping("info")
    public User userInfo(Model model, @RequestParam String id){
<<<<<<< HEAD
        User u = userService.userInfo(id);

        System.out.println("user = " + u);
        model.addAttribute("userInfo", u);
        return u;
=======
        User user = userService.userInfo(id);

        model.addAttribute("userInfo", user);
        return user;
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
    }

    //이메일 인증
    @GetMapping("/authmail")
    @ResponseBody
    public String authMailSender(@RequestParam String email) {
        System.out.println("이메일 인증 요청이 들어옴!");
        System.out.println("이메일 인증 이메일 : " + email);
        return mailService.joinEmail(email);
    }
}
