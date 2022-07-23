package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.SubjectInfo;

@Repository
public interface SubjectInfoRepository extends JpaRepository<SubjectInfo, Integer> {
}
