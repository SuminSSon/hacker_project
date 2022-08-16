package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Chat;
import project.khu.feature.model.Member;
import project.khu.feature.model.MemberId;
import project.khu.feature.model.User;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, MemberId> {

    @Query("select m from Member m where m.user_number = ?1")
    List<Member> findByUser_number(User user_number);

    @Query("select m from Member m where m.chat_number = ?1")
    Chat findByChat_number(Chat chat_number);
}
