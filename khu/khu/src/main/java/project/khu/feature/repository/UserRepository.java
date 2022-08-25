package project.khu.feature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.khu.feature.model.User;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.user_number = ?1")
    User findByUser_number(Integer user_number);

    @Query("select u from User u where u.user_name = ?1")
    User findByUser_name(String user_name);

    @Query("select u from User u where u.user_id = ?1")
    User findByUser_id(String user_id);

    @Query("select u from User u where u.user_id = ?1 and u.user_password = ?2")
    User findByUser_idAndUser_password(String user_id, String user_password);
}
