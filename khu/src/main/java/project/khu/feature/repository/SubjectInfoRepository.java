package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.SubjectInfo;

@Repository
public interface SubjectInfoRepository extends JpaRepository<SubjectInfo, Integer> {

    @Query("select s from SubjectInfo s where s.subject_number = ?1")
    SubjectInfo findBySubject_number(Integer subjectNumber);
}
