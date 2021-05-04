import React, {Component} from 'react';
import TeacherService from "../services/TeacherService";
import {withRouter} from "react-router-dom";
import StudentService from "../services/StudentService";

class ListTeachers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        TeacherService.getTeachers().then(res => {
            this.setState({teachers: res.data});
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.teachers !== prevState.teachers) {
            TeacherService.getTeachers().then(res => {
                this.setState({
                    teachers: res.data
                });
            });
        }
    }

    editTeacher(id) {
        this.props.history.push(`/edit_teacher/${id}`);
    }

    deleteTeacher(id) {
        TeacherService.deleteTeacher(id).then((res) => {
            this.setState({teachers: this.state.teachers.filter(teacher => teacher.id != id)});
        });
    }


    render() {
        return (
            <div>
                <h2 className="text-center">{this.props.title}</h2>
                <div className="row justify-content-center">
                    <table className="table table-striped table-bordered w-75">
                        <tbody>
                        {this.state.teachers.map(teacher =>  this.renderTeacher(teacher))}
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/>
            </div>
        );
    }

    renderTeacher(teacher) {
            return (
                <tr key={teacher.id}>
                    <td>{teacher.fio}</td>
                    <td>
                        <button onClick={() => this.editTeacher(teacher.id)}
                                className="btn btn-info btn-sm">Редактировать
                        </button>
                        <button style={{marginLeft: "10px"}}
                                onClick={() => this.deleteTeacher(teacher.id)}
                                className="btn btn-danger btn-sm">Удалить
                        </button>
                    </td>
                </tr>
            )
    }

}

export default withRouter(ListTeachers);