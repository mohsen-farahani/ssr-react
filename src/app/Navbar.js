import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios';
import styles from '../../styles/main.css'
import Masonry from 'react-masonry-css'


function Navbar() {
    const [data, setData] = useState({ items: [] });
    useEffect(() => {
        Axios(
            'https://api.lenzook.com/v1/client/posts',
        ).then(result => setData(result.data.data.data))

    }, []);

    const items = data.length > 0 ? data.map((value, key) => {
        return (
            <div key={key}>
                <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/post/${value.hash_id}`}>
                    {value.title}
                </NavLink>
            </div>
        )
    }) : ""

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <div>

            <div className={styles.app}>salam</div>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.myMasonryGgrid}
                columnClassName={styles.myMasonryGridColumn}
            >
                {items}
            </Masonry>



        </div>
    );
}
export default Navbar;


