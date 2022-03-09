import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

const PlayerRecord = ({ 
    playerNumber, 
    playerName, 
    isPlaying, 
    setIsPlaying, 
    threeBoxesMarked 
}) => {
    const [ recordState, setRecordState ] = useState([]);

    const getRandomNumber = () => {
        return Math.floor(Math.random() * (4));
    }
    
    const gameStarted = () => {
        let record = [];
        let pointer = 0;
        let tries = 0;

        while(pointer != 24) {
            const actualPointer = pointer;
            const randomNumber = getRandomNumber();
            let newPosition = actualPointer + randomNumber;
            let boxContent = 0;
            tries++;
    
            if(newPosition > 24) {
                newPosition = 24;
            }
    
            if(threeBoxesMarked.find((element) => element == newPosition)) {
                newPosition = 0;
                boxContent = -1;
            }
    
            record.push({
                tries: tries,
                actual_position: actualPointer,
                advance: randomNumber,
                box_content: boxContent,
                new_position: newPosition
            });
    
            pointer = newPosition;
            setRecordState(record);
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        (isPlaying && threeBoxesMarked) && gameStarted()
    }, [ isPlaying ]);

    useEffect(() => {
        setRecordState([]);
    }, [ threeBoxesMarked ]);

    return (
        <Fragment>
            <Paper sx={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', overflow: 'hidden' }}>
                
                <h2>Player {playerNumber}: {playerName}</h2>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">Tries</TableCell>
                            <TableCell align="center">Actual position</TableCell>
                            <TableCell align="center">Advance</TableCell>
                            <TableCell align="center">Content of this box</TableCell>
                            <TableCell align="center">New position</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            
                                { recordState.length > 0 && 
                                    recordState.map((record) => (
                                        <TableRow
                                            key={record.try}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="box" align="center">
                                            {record.tries}
                                            </TableCell>
                                            <TableCell component="th" scope="box" align="center">
                                            {record.actual_position}
                                            </TableCell>
                                            <TableCell component="th" scope="box" align="center">
                                            {record.advance}
                                            </TableCell>
                                            <TableCell component="th" scope="box" align="center">
                                            {record.box_content}
                                            </TableCell>
                                            <TableCell component="th" scope="box" align="center">
                                            {record.new_position}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Fragment>
    )
}

export default PlayerRecord;