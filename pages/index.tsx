import { Fragment } from "react";

import NextLink from 'next/link';

const Home = () => {
    return (
        <Fragment>
            <NextLink
                href='/practice1'
            >
                <a>Practice 1. Employees Managment System</a>
            </NextLink>
            <br /><br />
            <NextLink
                href='/practice2'
            >
                <a>Practice 2. Multiple Threads Game</a>
            </NextLink>
            <br /><br />
            <NextLink
                href='/examU1'
            >
                <a>Exam Unit 1. Employees Managment System</a>
            </NextLink>
        </Fragment>
    )
}

export default Home;

