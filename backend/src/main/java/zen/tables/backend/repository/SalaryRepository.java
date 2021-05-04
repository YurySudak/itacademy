package zen.tables.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zen.tables.backend.model.Mark;
import zen.tables.backend.model.Salary;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Integer> {
}
