import React, {Component} from 'react';
import AverageSalaryService from "../services/AverageSalaryService";

class AverageSalaries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            averageSalaries: [{teacher: {}, value: 0}],
            months: 12
        }

    }

    componentDidMount() {
        AverageSalaryService.getAllTeachersWithAverageSalariesByLastMonths(this.state.months).then(res => {
            this.setState({averageSalaries: res.data});
        });
    };


    componentDidUpdate(prevProps, prevState) {
        if (this.state.months !== prevState.months) {
            AverageSalaryService.getAllTeachersWithAverageSalariesByLastMonths(this.state.months).then(res => {
                this.setState({averageSalaries: res.data});
            });
        }
    }

    changeMonthsHandler = (e) => {
        let value = e.target.value;
        if (value > 12) value = 12;
        this.setState({months: e.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{this.props.title}</h2>
                <div className="row">
                    <table className="table table-striped table-bordered w-75">
                        <tbody>
                        <tr>
                            <td>Количество последних месяцев:</td>
                            <td>
                                <select value={this.state.months} onChange={this.changeMonthsHandler}
                                        className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>

                            </td>
                        </tr>
                        <tr>
                            <td><b>Преподаватель</b></td>
                            <td><b>Средняя зарплата</b></td>
                        </tr>
                        {this.state.averageSalaries.map(averageSalary =>
                            <tr key={averageSalary.teacher.id}>
                                <td>{averageSalary.teacher.fio}</td>
                                <td>
                                    {averageSalary.value}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/>
            </div>
        );
    }
}

export default AverageSalaries;