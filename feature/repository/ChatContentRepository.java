package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.ChatContent;
import project.khu.feature.model.ChatContentId;

@Repository
public interface ChatContentRepository extends JpaRepository<ChatContent, ChatContentId> {
}
