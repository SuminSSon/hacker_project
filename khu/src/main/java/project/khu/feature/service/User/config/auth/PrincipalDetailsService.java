package project.khu.feature.service.User.config.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.khu.feature.model.User;
import project.khu.feature.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
<<<<<<< HEAD
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService.loadUserByUsername");
        User userEntity = userRepository.findByUser_id(id);
=======
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService.loadUserByUsername");
        User userEntity = userRepository.findByUser_name(username);
>>>>>>> 68aa8336f70de0f3d5f37f6c31685a1989140e79
        System.out.println("userEntity = " + userEntity);
        return new PrincipalDetails(userEntity);
    }
}