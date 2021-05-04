import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import ListTeachers from "./components/ListTeachers";
import ListStudents from "./components/ListStudents";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Havbar";
import Info from "./components/Info";
import AverageSalaries from "./components/AverageSalaries";
import EditTeacher from "./components/EditTeacher";
import EditStudent from "./components/EditStudent";
import Exit from "./components/Exit";

function App() {

    const nav = [
        {id: 0, link: "/info", name: "Информация"},
        {id: 1, link: "/average_salaries", name: "Средние зарплаты преподавателей"},
        {id: 2, link: "/list_teachers", name: "Редактировать преподавателей"},
        {id: 3, link: "/list_students", name: "Редактировать студентов"},
        {id: 4, link: "/edit_teacher/add", name: "Добавить преподавателя"},
        {id: 5, link: "/edit_teacher/:id", name: "Редактировать преподавателя"},
        {id: 6, link: "/edit_student/add", name: "Добавить студента"},
        {id: 7, link: "/edit_student/:id", name: "Редактировать студента"},
        {id: 8, link: "/exit", name: "Выйти"}
    ];

    return (
        <div>
            <Router>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Navbar navig={nav}/>
                        </div>
                        <div className="col-9">
                                <Route path={nav[0].link} exact>
                                    <Info title={nav[0].name}/>
                                </Route>
                                <Route path={nav[1].link}>
                                    <AverageSalaries title={nav[1].name}/>
                                </Route>
                                <Route path={nav[2].link}>
                                    <ListTeachers title={nav[2].name}/>
                                </Route>
                                <Route path={nav[3].link}>
                                    <ListStudents title={nav[3].name}/>
                                </Route>
                                <Route path={nav[5].link}>
                                    <EditTeacher title={nav[5].name}/>
                                </Route>
                                <Route path={nav[7].link}>
                                    <EditStudent title={nav[7].name}/>
                                </Route>
                                <Route path={nav[8].link}>
                                    <Exit title={nav[8].name}/>
                                </Route>
                        </div>
                    </div>
                </div>
                <Footer/>
            </Router>
        </div>

    );
}

export default App;
