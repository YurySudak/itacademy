package zen.tables.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;
import zen.tables.backend.model.Student;
import zen.tables.backend.repository.MarkRepository;
import zen.tables.backend.repository.StudentRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(Const.url)
@AllArgsConstructor
public class StudentController {

    private final StudentRepository studentRepository;
    private final MarkRepository markRepository;

    @GetMapping(Const.studentUrl)
    public List<Student> getAllStudents() {
        return studentRepository.findAll().stream()
                .sorted(Comparator.comparingInt(Student::getId))
                .collect(Collectors.toList());
    }

    @PostMapping(Const.studentUrl)
    public Student createStudent(@RequestBody Student student) {
        Student fakeStudent = studentRepository.save(new Student("fio", 0, "login", "password"));
        int id = fakeStudent.getId();
        student.setId(id);
        student.getMarks().forEach(mark -> {
            mark.setStudentId(id);
            mark.setGroupId(student.getGroups().iterator().next().getId());
        });
        return studentRepository.save(student);
    }

    @GetMapping(Const.studentUrl + "/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Student not exist with id: " + id));
        return ResponseEntity.ok(student);
    }

    @PutMapping(Const.studentUrl + "/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        studentRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Student not exist with id: " + id));
        return ResponseEntity.ok(studentRepository.save(student));
    }

    @DeleteMapping(Const.studentUrl + "/{id}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable Integer id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Student not exist with id: " + id));
        student.getMarks().forEach(markRepository::delete);
        studentRepository.delete(student);
        return ResponseEntity.ok(true);
    }
}
