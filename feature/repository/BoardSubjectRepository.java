package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.BoardSubject;
import project.khu.feature.model.BoardSubjectId;

@Repository
public interface BoardSubjectRepository extends JpaRepository<BoardSubject, BoardSubjectId> {
}
