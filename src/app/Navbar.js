import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios';
import '../styles/App.css'


function Navbar() {
    const [data, setData] = useState({ items: [] });
    useEffect(() => {
        Axios(
            'https://api.lenzook.com/v1/client/posts',
        ).then(result => setData(result.data.data.data))

    }, []);


    return (
        <div>
            <div styleName="app">
                Test postcss
            </div>

            <ul>
                {data.length > 0 ? data.map((value, key) => {
                    return (
                        <li key={key}>
                            <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/post/${value.hash_id}`}>
                                {value.title}
                            </NavLink>
                        </li>
                    )
                }) : ""}
            </ul>
        </div>
    );
}
export default Navbar;


