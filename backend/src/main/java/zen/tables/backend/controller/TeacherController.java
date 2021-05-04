package zen.tables.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;
import zen.tables.backend.model.Teacher;
import zen.tables.backend.repository.SalaryRepository;
import zen.tables.backend.repository.TeacherRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(Const.url)
@AllArgsConstructor
public class TeacherController {

    private final TeacherRepository teacherRepository;
    private final SalaryRepository salaryRepository;

    @GetMapping(Const.teacherUrl)
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .sorted(Comparator.comparingInt(Teacher::getId))
                .collect(Collectors.toList());
    }

    @PostMapping(Const.teacherUrl)
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        Teacher fakeTeacher = teacherRepository.save(new Teacher("fio", 0, "login", "password"));
        int id = fakeTeacher.getId();
        teacher.setId(id);
        teacher.getSalary().forEach(salary -> salary.setTeacherId(id));
        return teacherRepository.save(teacher);
    }

    @GetMapping(Const.teacherUrl + "/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Integer id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Teacher not exist with id: " + id));
        return ResponseEntity.ok(teacher);
    }

    @PutMapping(Const.teacherUrl + "/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable Integer id, @RequestBody Teacher teacher) {
        teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Teacher not exist with id: " + id));
        return ResponseEntity.ok(teacherRepository.save(teacher));
    }

    @DeleteMapping(Const.teacherUrl + "/{id}")
    public ResponseEntity<Boolean> deleteTeacher(@PathVariable Integer id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Teacher not exist with id: " + id));
        teacher.getSalary().forEach(salaryRepository::delete);
        teacherRepository.delete(teacher);
        return ResponseEntity.ok(true);
    }
}
