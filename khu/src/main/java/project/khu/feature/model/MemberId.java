package project.khu.feature.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberId implements Serializable {

    private UUID user_number;
    private UUID chat_number;
}
