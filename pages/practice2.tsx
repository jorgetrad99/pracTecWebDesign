import { Button, Container } from "@mui/material";
import { Fragment, useState } from "react";
import PlayerRecord from "../components/practice2/PlayerRecord";
import Vector from "../components/practice2/Vector";

const Practice2 = () => {
    const [ threeBoxesMarked, setThreeBoxesMarked ] = useState();

    return (
        <Fragment>
            <Vector setThreeBoxesMarked={setThreeBoxesMarked} />
            <Container sx={{ 
                display: 'flex',
                justifyContent: 'center',
                padding: 0
             }}>
                <Container sx={{
                    margin: '0 1rem',
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: 0
                }}>
                    <PlayerRecord playerNumber={1} playerName='Joaquín' />
                    <PlayerRecord playerNumber={2} playerName='Guillermo' />
                    <PlayerRecord playerNumber={3} playerName='José' />
                </Container>

            </Container>
            <Button variant='contained'>Jugar</Button>
        </Fragment>
    );
}

export default Practice2;