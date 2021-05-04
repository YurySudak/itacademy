package zen.tables.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zen.tables.backend.model.AverageSalary;
import zen.tables.backend.model.Salary;
import zen.tables.backend.model.Teacher;
import zen.tables.backend.repository.TeacherRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(Const.url)
@AllArgsConstructor
public class AverageSalaryController {

    private final TeacherRepository teacherRepository;


    @GetMapping(Const.salaryUrl + "/{months}")
    public List<AverageSalary> getAllTeachersWithAverageSalariesByLastMonths(@PathVariable Integer months) {
        List<AverageSalary> averageSalaries = new ArrayList<>();
        for(Teacher teacher : teacherRepository.findAll()) {
            Set<Salary> salaries = teacher.getSalary();
            double sum = 0;
            int num = 0;
            for(Salary salary : salaries) {
                if (salary.getMonth() > 12 - months) {
                    sum += salary.getValue();
                    num++;
                }
            }
            double averageSalary = new BigDecimal(sum/num).setScale(2, RoundingMode.HALF_DOWN).doubleValue();
            averageSalaries.add(new AverageSalary(teacher, averageSalary));
        }
        return averageSalaries;
    }

}