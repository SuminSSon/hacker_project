package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Chat;
import project.khu.feature.model.ChatContent;
import project.khu.feature.model.ChatContentsId;

import java.util.List;

@Repository
public interface ChatContentRepository extends JpaRepository<ChatContent, ChatContentsId> {

    @Query("select c from ChatContent c where c.chat_number = ?1")
    List<ChatContent> findByChat_number(Chat chat_number);
}
