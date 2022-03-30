import { Container } from "@mui/material";



const Practice1U2 = () => {
    const myDate = new Date();

    const addZeroToLeft = (item) => {
        return item < 10 ? `0${item}` : item;
    }
    return (
        <Container>
            <h1>Testing expreessions</h1>
            <h3>The date and hour now: { myDate.toString() }</h3>
            <h3>Local date and hour: { `${myDate.toDateString()} ${ addZeroToLeft(myDate.getHours()) }:${ addZeroToLeft(myDate.getMinutes()) }:${ addZeroToLeft(myDate.getSeconds()) }` }</h3>
            <h3>16 squared: {Math.pow(16, 2)}</h3>
            <h3>Square root of 16: {Math.sqrt(16)}</h3>
            <br /><br />
            <h1>Testing declarations</h1>
            <h3>4 squared: {Math.pow(4, 2)}</h3>
            <h3>Square root of 4: {Math.sqrt(4)}</h3>
        </Container>
    );
};

export default Practice1U2;