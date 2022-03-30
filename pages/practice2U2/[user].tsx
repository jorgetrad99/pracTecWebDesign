import { useRouter } from "next/router";
import { Fragment } from "react";
import NextLink from 'next/link';

const loginSuccessfull = () => {

    const {
        query: { user }
      } = useRouter();
      
    return (
        <Fragment>
            <h1>Welcome back, {user}!!</h1>

            <NextLink
                href='/practice2U2'
            >
                <a>Maintenance</a>
            </NextLink>
            <br /><br />
            <NextLink
                href='/practice2U2'
            >
                <a>Queries</a>
            </NextLink>
            <br /><br />
            <NextLink
                href='/practice2U2'
            >
                <a>Reports</a>
            </NextLink>
            <br /><br />
            <NextLink
                href='/practice2U2'
            >
                <a>About us</a>
            </NextLink>
        </Fragment>
        
    );
}

export default loginSuccessfull;