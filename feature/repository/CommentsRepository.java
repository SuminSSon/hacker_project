package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Comments;
import project.khu.feature.model.CommentsId;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, CommentsId> {
}
