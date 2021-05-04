package zen.tables.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zen.tables.backend.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
