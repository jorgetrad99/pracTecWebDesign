import { Container } from "@mui/material";

const Practice1U2 = () => {
    return (
        <Container>
            <h1>Testing expreessions</h1>
            <h3>The date and hour now: {new Date().toString()}</h3>
            <h3>Local date and hour: {new Date().toString()}</h3>
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