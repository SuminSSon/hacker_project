package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Chat;
import project.khu.feature.model.SubjectInfo;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("select c from Chat c where c.subject_number = ?1")
    List<Chat> findAllBySubject_number(SubjectInfo subject_number);

    @Query("select c from Chat c where c.chat_number = ?1")
    Chat findByChat_number(Integer chat_number);

}
