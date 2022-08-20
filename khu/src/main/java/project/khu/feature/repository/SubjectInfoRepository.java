package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.SubjectInfo;

import java.util.List;

@Repository
public interface SubjectInfoRepository extends JpaRepository<SubjectInfo, Integer> {

    @Query("select s from SubjectInfo s where s.subject_number = ?1")
    SubjectInfo findBySubject_number(Integer subjectNumber);

    @Query("select s from SubjectInfo s where s.subject_name = ?1 and s.subject_professor = ?2")
    SubjectInfo findBySubject_nameAndSubject_professor(String subject_name, String subject_professor);


    @Query("select s from SubjectInfo s where s.subject_name = ?1")
    List<SubjectInfo> findAllBySubject_name(String subjectName);
}
