import React, {Component} from 'react';
import StudentService from "../services/StudentService";
import {withRouter} from "react-router-dom";
import GroupService from "../services/GroupService";

class EditStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            title: props.title,
            newStudent: {
                fio: 'Тиханович Евгений Евгеньевич',
                age: 25,
                login: 'tih',
                password: 'tih',
                groups: [{id: 1, "groupName": 'Java Core'}],
                marks: [{}]
            },
            editStudent: {
                id: 0,
                fio: '',
                age: 0,
                login: '',
                password: '',
                groups: [{}],
                marks: [{}]
            },
            allGroups: [{}]
        }
        this.updateStudent = this.updateStudent.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "add") {
            this.setState({title: "Добавить студента"});
            this.setState({editStudent: this.state.newStudent})
        } else
            StudentService.getStudentById(this.state.id).then(res => {
                this.setState({editStudent: res.data})
            });
        GroupService.getGroups().then(res => {
            this.setState({allGroups: res.data});
        });

    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.match.params.id !== prevProps.match.params.id) {
    //         this.setState({id: this.props.match.params.id});
    //         if (this.props.match.params.id === "add") {
    //             this.setState({title: "Добавить студента"});
    //             this.setState({editStudent: this.state.newStudent})
    //         } else {
    //             this.setState({title: "Редактировать студента"});
    //             StudentService.getStudentById(this.props.match.params.id).then(res => {
    //                 this.setState({editStudent: res.data})
    //             });
    //         }
    //     }
    // }

    updateStudent = (e) => {
        e.preventDefault();
        if (this.state.id === "add")
            StudentService.createStudent(this.state.editStudent).then(r => console.log(r));
        else {
            StudentService.updateStudent(this.state.editStudent, this.state.editStudent.id).then(r => console.log(r));
        }
        this.props.history.push(`/list_students`);
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/list_students`);
    }

    changeEditStudentFioHandler = (e) => {
        let student = this.state.editStudent;
        student.fio = e.target.value;
        this.setState({editStudent: student});
    }

    changeEditStudentAgeHandler = (e) => {
        let student = this.state.editStudent;
        student.age = e.target.value;
        this.setState({editStudent: student});
    }

    changeEditStudentLoginHandler = (e) => {
        let student = this.state.editStudent;
        student.login = e.target.value;
        this.setState({editStudent: student});
    }

    changeEditStudentPasswordHandler = (e) => {
        let student = this.state.editStudent;
        student.password = e.target.value;
        this.setState({editStudent: student});
    }

    changeEditStudentGroupsHandler = (e) => {
        let student = this.state.editStudent;
        if (e.target.checked == true) {
            let group = {id: e.target.id, groupName: e.target.value};
            student.groups.push(group);
        } else {
            student.groups = student.groups.filter(g => g.id != e.target.id);
        }
        this.setState({editStudent: student});
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
                    <div className="card col-md-8 offset-md-2">
                        <table className="table table-striped table-bordered w-100">
                            <tbody>
                            <tr key="fio">
                                <td>ФИО:</td>
                                <td><input className="form-control"
                                           value={this.state.editStudent.fio}
                                           onChange={this.changeEditStudentFioHandler}/></td>
                            </tr>
                            <tr key="age">
                                <td>Возраст:</td>
                                <td><input className="form-control"
                                               value={this.state.editStudent.age}
                                               onChange={this.changeEditStudentAgeHandler}/></td>
                            </tr>
                            <tr key="login">
                                <td>Логин:</td>
                                <td><input className="form-control"
                                             value={this.state.editStudent.login}
                                             onChange={this.changeEditStudentLoginHandler}/></td>
                            </tr>
                            <tr key="password">
                                <td>Пароль:</td>
                                <td><input className="form-control"
                                              value={this.state.editStudent.password}
                                              onChange={this.changeEditStudentPasswordHandler}/></td>
                            </tr>
                            <tr key="group">
                                <td>Группы:</td>
                                <td>{this.state.allGroups.map(group =>
                                    <div><input type="checkbox" className="custom-checkbox"
                                                value={group.groupName} id={group.id} checked={this.isChecked(group)}
                                                onChange={this.changeEditStudentGroupsHandler}/> {group.groupName}</div>)}</td>
                            </tr>
                            <tr key="buttons"><td colSpan="2">
                                <button className="btn btn-success btn-sm"
                                        onClick={this.updateStudent}>Сохранить
                                </button>
                                {this.cancelButton()}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

    isChecked(group) {
        let result = false;
        this.state.editStudent.groups.map(gr => {
            if (group.groupName === gr.groupName) {
                result = true;
            }
                })
        return result;
    }
}

export default withRouter(EditStudent);