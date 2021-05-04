import axios from "axios";

const USERS_URL = "http://localhost:8080/api/v1/teachers";

class TeacherService {
    getTeachers() {
        return axios.get(USERS_URL);
    }

    getTeacherById(teacherId) {
        return axios.get(USERS_URL + '/' + teacherId);
    }

    createTeacher(teacher) {
        return axios.post(USERS_URL, teacher);
    }

    updateTeacher(teacher, teacherId) {
        return axios.put(USERS_URL + '/' + teacherId, teacher);
    }

    deleteTeacher(teacherId) {
        return axios.delete(USERS_URL + '/' + teacherId);
    }
}

export default new TeacherService();