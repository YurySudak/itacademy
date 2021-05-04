import React, {Component} from 'react';

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{this.props.title}</h2>
                <div className="card col-md-6 offset-md-3">
                    <div className="text-body">Добро пожаловать. Для добавления и редактирования пользователей воспользуйтесь меню.</div>
                </div>
                <br/><br/><br/>
            </div>
        );
    }
}

export default Info;