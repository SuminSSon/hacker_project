package project.khu.feature.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.khu.feature.model.Board;
import project.khu.feature.model.SubjectInfo;

@Data
@NoArgsConstructor
public class SubjectInfoDto {
    private Integer subject_number;
    private String subject_name;
    private String subject_professor;

    // Dto -> Entity
    public SubjectInfo toEntity() {
        SubjectInfo subjectInfo = SubjectInfo.builder()
                .subject_name(subject_name)
                .subject_number(subject_number)
                .subject_professor(subject_professor)
                .build();

        return subjectInfo;
    }

    // Entity -> Dto
    @Builder
    public SubjectInfoDto(String subject_name, String subject_professor) {
        this.subject_name = subject_name;
        this.subject_professor = subject_professor;
    }
}
