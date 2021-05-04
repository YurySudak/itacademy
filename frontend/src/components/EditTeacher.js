import React, {Component} from 'react';
import TeacherService from "../services/TeacherService";
import {withRouter} from "react-router-dom";

class EditTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            title: props.title,
            newTeacher: {
                fio: 'Слабко Юлий Юльевич',
                age: 25,
                login: 'sla',
                password: 'sla',
                group: {"groupName": 'C++'},
                salary: [{month: 1, value: 1400}, {month: 2, value: 1500}, {month: 3, value: 1500},
                    {month: 4, value: 1400}, {month: 5, value: 1500}, {month: 6, value: 1500},
                    {month: 7, value: 1400}, {month: 8, value: 1500}, {month: 9, value: 1500},
                    {month: 10, value: 1400}, {month: 11, value: 1500}, {month: 12, value: 1500}]
            },
            editTeacher: {
                id: 0,
                fio: '',
                age: 0,
                login: '',
                password: '',
                group: {},
                salary: [{}]
            }
        }
        this.updateTeacher = this.updateTeacher.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "add") {
            this.setState({title: "Добавить преподавателя"});
            this.setState({editTeacher: this.state.newTeacher})
        } else
            TeacherService.getTeacherById(this.state.id).then(res => {
                this.setState({editTeacher: res.data})
            });
    }

    updateTeacher = (e) => {
        e.preventDefault();
        if (this.state.id === "add")
            TeacherService.createTeacher(this.state.editTeacher).then(r => console.log(r));
        else
            TeacherService.updateTeacher(this.state.editTeacher, this.state.editTeacher.id).then(r => console.log(r));
        this.props.history.push(`/list_teachers`);
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/list_teachers`);
    }

    changeEditTeacherFioHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.fio = e.target.value;
        this.setState({editTeacher: teacher});
    }

    changeEditTeacherAgeHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.age = e.target.value;
        this.setState({editTeacher: teacher});
    }

    changeEditTeacherLoginHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.login = e.target.value;
        this.setState({editTeacher: teacher});
    }

    changeEditTeacherPasswordHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.password = e.target.value;
        this.setState({editTeacher: teacher});
    }

    changeEditTeacherGroupHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.group = e.target.value;
        this.setState({editTeacher: teacher});
    }

    changeEditTeacherSalaryHandler = (e) => {
        let teacher = this.state.editTeacher;
        teacher.salary.forEach(s => s.id == e.target.id ? s.value = e.target.value : true);
        this.setState({editTeacher: teacher});
    }

    cancelButton() {
        if (this.props.match.params.id !== "add")
            return <button className="btn btn-danger btn-sm"
                           onClick={this.cancel}
                           style={{marginLeft: "10px"}}>Отменить
                    </button>
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{this.state.title}</h2>
                <div className="row">
                    <div className="card col-md-8 offset-md-2">
                        <table className="table table-striped table-bordered w-100">
                            <tbody>
                            <tr key="fio">
                                <td>ФИО:</td>
                                <td><input className="form-control"
                                           value={this.state.editTeacher.fio}
                                           onChange={this.changeEditTeacherFioHandler}/></td>
                            </tr>
                            <tr key="age">
                                <td>Возраст:</td>
                                <td><input className="form-control"
                                               value={this.state.editTeacher.age}
                                               onChange={this.changeEditTeacherAgeHandler}/></td>
                            </tr>
                            <tr key="login">
                                <td>Логин:</td>
                                <td><input className="form-control"
                                             value={this.state.editTeacher.login}
                                             onChange={this.changeEditTeacherLoginHandler}/></td>
                            </tr>
                            <tr key="password">
                                <td>Пароль:</td>
                                <td><input className="form-control"
                                              value={this.state.editTeacher.password}
                                              onChange={this.changeEditTeacherPasswordHandler}/></td>
                            </tr>
                            <tr key="group">
                                <td>Группа:</td>
                                <td><input className="form-control"
                                           value={this.state.editTeacher.group.groupName}
                                           onChange={this.changeEditTeacherGroupHandler}/></td>
                            </tr>
                            <tr key="salary">
                                <td>Зарплаты:</td>
                                <td>{this.state.editTeacher.salary.sort((a , b) => a.month - b.month).map(salary =>
                                    <div>Месяц {salary.month}: <input
                                                value={salary.value} id={salary.id}
                                                onChange={this.changeEditTeacherSalaryHandler}/></div>)}</td>
                            </tr>
                            <tr key="buttons"><td colSpan="2">
                                <button className="btn btn-success btn-sm"
                                        onClick={this.updateTeacher}>Сохранить
                                </button>
                                {this.cancelButton()}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

        // if (this.state.editTeacher.type == 3)
        //     return <tr key="group">
        //         <td>Группы:</td>
        //         <td>{this.state.editTeacher.groups.map(group =>
        //         <div><input type="checkbox" checked className="custom-checkbox"
        //                value={group.groupName} id={group.id}
        //                onChange={this.changeEditTeacherGroupsHandler}/> {group.groupName}</div>)
        //         }</td>
        //     </tr>;


}

export default withRouter(EditTeacher);