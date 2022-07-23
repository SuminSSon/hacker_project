package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Board;

import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<Board, UUID> {
}
