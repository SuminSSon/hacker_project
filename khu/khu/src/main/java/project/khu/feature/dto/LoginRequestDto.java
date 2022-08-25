package project.khu.feature.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String user_id; // ID
    private String user_password; // PW
    private String user_name; // 이름
    private Integer user_point; // 포인트
    private Integer user_recom; // 추천수
}
