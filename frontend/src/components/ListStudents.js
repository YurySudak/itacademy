import React, {Component} from 'react';
import StudentService from "../services/StudentService";
import {withRouter} from "react-router-dom";

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        StudentService.getStudents().then(res => {
            this.setState({students: res.data});
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.students !== prevState.students) {
            StudentService.getStudents().then(res => {
                this.setState({
                    students: res.data
                });
            });
        }
    }

    editStudent(id) {
        this.props.history.push(`/edit_student/${id}`);
    }

    deleteStudent(id) {
        StudentService.deleteStudent(id).then((res) => {
            this.setState({students: this.state.students.filter(student => student.id != id)});
        });
    }


    render() {
        return (
            <div>
                <h2 className="text-center">{this.props.title}</h2>
                <div className="row justify-content-center">
                    <table className="table table-striped table-bordered w-75">
                        <tbody>
                        {this.state.students.map(student =>  this.renderStudent(student))}
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/>
            </div>
        );
    }

    renderStudent(student) {
            return (
                <tr key={student.id}>
                    <td>{student.fio}</td>
                    <td>
                        <button onClick={() => this.editStudent(student.id)}
                                className="btn btn-info btn-sm">Редактировать
                        </button>
                        <button style={{marginLeft: "10px"}}
                                onClick={() => this.deleteStudent(student.id)}
                                className="btn btn-danger btn-sm">Удалить
                        </button>
                    </td>
                </tr>
            )
    }

}

export default withRouter(ListStudents);