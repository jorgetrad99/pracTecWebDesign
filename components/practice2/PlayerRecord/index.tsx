import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fragment } from "react";

const PlayerRecord = ({playerNumber, playerName, }) => {

    return (
        <Fragment>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
             }}>
                <h2>Player {playerNumber}: {playerName}</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">Actual position</TableCell>
                            <TableCell align="center">Advance</TableCell>
                            <TableCell align="center">Content of this box</TableCell>
                            <TableCell align="center">New position</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            <TableRow
                            /* key={1} */
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="box" align="center">
                                0
                                </TableCell>
                                <TableCell component="th" scope="box" align="center">
                                1
                                </TableCell>
                                <TableCell component="th" scope="box" align="center">
                                0
                                </TableCell>
                                <TableCell component="th" scope="box" align="center">
                                1
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Fragment>
    )
}

export default PlayerRecord;