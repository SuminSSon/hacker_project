package project.khu.feature.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
                .subject_name(this.subject_name)
                .subject_professor(this.subject_professor)
                .build();

        return subjectInfo;
    }

    // Entity -> Dto
    @Builder
    public SubjectInfoDto(String subject_name, String subject_professor, Integer subject_number) {
        this.subject_number = subject_number;
        this.subject_name = subject_name;
        this.subject_professor = subject_professor;
    }

    @Override
    public String toString() {
        return "SubjectInfoDto{" +
                "subject_number= " + subject_number + '\'' +
                ", subject_name= " + subject_name + '\'' +
                ", subject_professor= " + subject_professor + '\'' +
                "}";
    }
}
