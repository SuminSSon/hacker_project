package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Board;
import project.khu.feature.model.BoardSubject;
import project.khu.feature.model.BoardSubjectId;
import project.khu.feature.model.SubjectInfo;

import java.util.List;

@Repository
public interface BoardSubjectRepository extends JpaRepository<BoardSubject, BoardSubjectId> {


    @Query("select b from BoardSubject b where b.subject_number = ?1")
    List<Board> findAllBySubject_number(SubjectInfo subject_number);
}
