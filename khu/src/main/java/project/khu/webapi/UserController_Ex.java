//package project.khu.webapi;
//
//
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//import project.khu.feature.service.User.SignUpDTO;
//import project.khu.feature.service.User.UserDto;
//import project.khu.feature.service.User.UserListResponseDTO;
//import project.khu.feature.service.User.jwt.TokenUtils;
//import project.khu.feature.service.UserService;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping(value = "/user")
//public class UserController {
//
//    private final BCryptPasswordEncoder passwordEncoder;
//    private final UserService userService;
//
//    @PostMapping(value = "/signUp")
//    public ResponseEntity<String> signUp(@RequestBody final SignUpDTO signUpDTO) {
//        return userService.findById(signUpDTO.getUser_id()).isPresent()
//                ? ResponseEntity.badRequest().build()
//                : ResponseEntity.ok(TokenUtils.generateJwtToken(userService.signUp(signUpDTO)));
//    }
//
//    @GetMapping(value = "/list")
//    public ResponseEntity<UserListResponseDTO> findAll() {
//        final UserListResponseDTO userListResponseDTO = UserListResponseDTO.builder()
//                .userList(userService.findAll()).build();
//
//        return ResponseEntity.ok(userListResponseDTO);
//    }
//
//}