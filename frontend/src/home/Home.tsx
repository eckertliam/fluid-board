import {JSX} from 'react'
import './Home.css';
import {Link} from "react-router-dom";

function Home(): JSX.Element {
    return (
        <>
            <Link to={'/board'}>Board</Link>
        </>
    )
}

export default Home;