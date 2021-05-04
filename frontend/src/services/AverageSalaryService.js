import axios from "axios";

const USERS_URL = "http://localhost:8080/api/v1/salary";

class AverageSalaryService {


    getAllTeachersWithAverageSalariesByLastMonths(months) {
        return axios.get(USERS_URL + '/' + months);
    }

}

export default new AverageSalaryService();