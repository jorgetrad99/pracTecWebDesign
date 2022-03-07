import { Fragment } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const boxes = [];

let headBox = [];
for (let i = 0; i < 25; i++) {
    headBox.push(i);
}
console.log(headBox);

for (let i = 0; i < 25; i++) {
    boxes.push(0);
}

/* const markThreeBoxesWithX = () => {
  const threeBoxIndex = [];




}; */


const Vector = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
                headBox.map((index) => {
                    return <TableCell align="center">{index}</TableCell>
                })
            }
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              /* key={box} */
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {boxes.map((box) => (
              <TableCell component="th" scope="box" align="center">
                {boxes[box]}
              </TableCell>
              ))}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* const Vector = () => {
    return (
        <Fragment>

        </Fragment>
    );
}; */

export default Vector;