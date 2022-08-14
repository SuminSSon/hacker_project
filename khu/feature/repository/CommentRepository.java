package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Comments;
import project.khu.feature.model.CommentsId;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comments, CommentsId> {
    @Query("select c from Comments c where c.board_number = ?1")
    List<Comments> findAllByBoard_number(Integer boardNumber);
}
