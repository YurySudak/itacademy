import {NavLink} from "react-router-dom";
import React from 'react';

function Navbar(props) {

    return (
        <nav>
            {props.navig
                .filter(e => e.id !== 5 && e.id !== 7)
                .map(e => <div key={e.id}>
                          <NavLink to={e.link} className="page-link">{e.name}</NavLink>
                          </div>
                )
            }
        </nav>
    )
}

export default Navbar;