import { LoadingButton } from "@mui/lab";
import { Button, Container } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import PlayerRecord from "../components/practice2/PlayerRecord";
import Vector from "../components/practice2/Vector";

const Practice2U1 = () => {
    const [ threeBoxesMarked, setThreeBoxesMarked ] = useState();
    const [ isPlaying, setIsPlaying ] = useState(false);

    const [ markThreeBoxesWithXFlag, setMarkThreeBoxesWithXFlag ] = useState(false);

    return (
        <Fragment>
            <Vector 
                setThreeBoxesMarked={setThreeBoxesMarked} 
                setMarkThreeBoxesWithXFlag={setMarkThreeBoxesWithXFlag} 
                markThreeBoxesWithXFlag={markThreeBoxesWithXFlag} 
            />
            <div style={{ 
                display: 'flex',
                width: '100%',
                marginTop: '2rem',
                justifyContent: 'center',
                padding: 0
             }}>
                <div style={{
                    margin: '0 1rem',
                    width: 'inherit',
                    display: 'grid',
                    gap: '2rem',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: 0
                }}>
                    <PlayerRecord playerNumber={1} playerName='Joaquín' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                    <PlayerRecord playerNumber={2} playerName='Guillermo' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                    <PlayerRecord playerNumber={3} playerName='José' isPlaying={isPlaying} setIsPlaying={setIsPlaying} threeBoxesMarked={threeBoxesMarked} />
                </div>

            </div>
            <Container sx={{ 
                display: 'flex',
                justifyContent: 'center',
                margin: '2rem'
             }}>
                 <Button variant='outlined' sx={{ 
                    marginRight: '1rem'
                 }} onClick={() => setMarkThreeBoxesWithXFlag(true)}>
                     Mark 3 boxes with -1
                </Button>
                { !isPlaying ?  (
                    <Button variant='contained' onClick={() => setIsPlaying(!isPlaying)}>Jugar</Button>
                    ) : (
                        <LoadingButton
                        loading
                        loadingPosition="end"
                        variant="outlined"
                        >
                            Simulating
                        </LoadingButton>
                )
                
                }
            </Container>
        </Fragment>
    );
}

export default Practice2U1;