package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
}
