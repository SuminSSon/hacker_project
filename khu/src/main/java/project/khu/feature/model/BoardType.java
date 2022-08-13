package project.khu.feature.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardType {
    Info,    // 정보 게시판 : 0
    Subject;  // 과목 게시판 : 1

/*    private final String key; //역할 뭔지 모름
    private final String title;*/
}