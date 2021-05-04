import axios from "axios";

const USERS_URL = "http://localhost:8080/api/v1/students";

class StudentService {
    getStudents() {
        return axios.get(USERS_URL);
    }

    getStudentById(studentId) {
        return axios.get(USERS_URL + '/' + studentId);
    }

    createStudent(student) {
        return axios.post(USERS_URL, student);
    }

    updateStudent(student, studentId) {
        return axios.put(USERS_URL + '/' + studentId, student);
    }

    deleteStudent(studentId) {
        return axios.delete(USERS_URL + '/' + studentId);
    }
}

export default new StudentService();