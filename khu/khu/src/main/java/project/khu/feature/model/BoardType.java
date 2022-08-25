package project.khu.feature.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardType {
    Info,     // 정보 게시판
    Subject;  // 과목 게시판
}