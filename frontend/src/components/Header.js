import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td><img src="it-academy.jpg" alt="logo" width="300px"/></td>
                            <td><h1>Страница администратора</h1></td>
                        </tr>
                        </tbody>
                    </table>
                </header>
            </div>
        );
    }
}

export default Header;