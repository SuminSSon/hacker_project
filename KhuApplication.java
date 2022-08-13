package project.khu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @EnableJpaAuditing // Base_Entity 에 있는 날짜 자동 입력 활성화
@SpringBootApplication
public class KhuApplication {

    public static void main(String[] args) {
        SpringApplication.run(KhuApplication.class, args);
    }

}