package zen.tables.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zen.tables.backend.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
}
