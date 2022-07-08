package project.khu.feature.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.MemberExample;

@Repository
public interface MemberExampleRepository extends JpaRepository<MemberExample, Integer> {
}
