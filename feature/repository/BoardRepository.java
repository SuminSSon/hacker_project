package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.Board;


@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Query("select b from Board b where b.board_number = ?1")
    Board findByBoard_number(Integer boardNumber);
}