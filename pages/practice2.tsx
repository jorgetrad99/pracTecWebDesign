import { Button, Container } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import PlayerRecord from "../components/practice2/PlayerRecord";
import Vector from "../components/practice2/Vector";

const Practice2 = () => {
    const [ threeBoxesMarked, setThreeBoxesMarked ] = useState();
    const [ isPlaying, setIsPlaying ] = useState(false);

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
                    <PlayerRecord playerNumber={1} playerName='Joaquín' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                    <PlayerRecord playerNumber={2} playerName='Guillermo' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                    <PlayerRecord playerNumber={3} playerName='José' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                </Container>

            </Container>
            <Button variant='contained' onClick={() => setIsPlaying(!isPlaying)}>Jugar</Button>
        </Fragment>
    );
}

export default Practice2;