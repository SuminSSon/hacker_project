package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Member;
import project.khu.feature.model.MemberId;

@Repository
public interface MemberRepository extends JpaRepository<Member, MemberId> {
}
