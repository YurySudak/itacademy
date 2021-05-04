package zen.tables.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zen.tables.backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
