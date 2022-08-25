package project.khu.feature.service.User;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.khu.feature.model.User;
import project.khu.feature.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
//@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    // 1. 회원가입
    @Override
    public boolean join(User user){
        if(userRepository.findByUser_id(user.getUser_id()) != null){
            return false;
        } else {
            user.setUser_id(user.getUser_id());
            user.setUser_password(bCryptPasswordEncoder.encode(user.getUser_password()));
            user.setUser_name(user.getUser_name());
            user.setUser_point(0);
            user.setUser_recom(0);
            user.setUser_roles("ROLE_USER");
            userRepository.save(user);

            return true;
        }
    }

    // 2. 로그인
    public String login(User user){
        System.out.println(userRepository.findByUser_idAndUser_password(user.getUser_id(), bCryptPasswordEncoder.encode(user.getUser_password())));

        return "login 구현 실패";
    }

    @Override
    public User userInfo(String id){
        return userRepository.findByUser_id(id);
    }

    @Override
    public List<User> allUserInfo(){
        return userRepository.findAll();
    }
}
