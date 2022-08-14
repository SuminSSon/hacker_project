package project.khu.feature.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardSubjectId implements Serializable {

    private Integer subject_number;
    private Integer board_number;
}
