import React, {Component} from 'react';

class Exit extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2 className="text-center">{this.props.title}</h2>
                <div className="row">

                </div>
                <br/><br/><br/>
            </div>
        );
    }
}

export default Exit;