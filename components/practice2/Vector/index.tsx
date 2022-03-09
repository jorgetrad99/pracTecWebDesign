import { Fragment, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";
import PlayerRecord from "../PlayerRecord";

let boxes = [];

let headBox = [];

const Vector = ({ setThreeBoxesMarked }) => {
  const [ boxesState, setBoxesState ] = useState([]);

  const settingPositionBoxes = () => {
    headBox = [];
    for (let i = 0; i < 25; i++) {  //Filling head row with the position of the boxes
      headBox.push(i);
    }
  }

  const FillBoxesWithZero = () => {
    boxes = [];
    for (let i = 0; i < 25; i++) {  //Filling boxes with 0
      boxes.push(0);
    }
    setBoxesState(boxes);
  }

  const initiallizeVector = () => {
    settingPositionBoxes();
    FillBoxesWithZero();
  }

const markThreeBoxesWithX = () => {
  let threeBoxIndex = [];
  FillBoxesWithZero();

  while(true) {
    const randomBox = Math.floor(Math.random() * ((boxes.length - 1) - 1)) + 1;
    if(threeBoxIndex.find(box => box == randomBox ) == undefined) {   //If marked boxes are not repeated
      threeBoxIndex.push(randomBox);
      boxes[randomBox] = -1;
    }
    if(threeBoxIndex.length == 3){
      setThreeBoxesMarked(threeBoxIndex);
      setBoxesState(boxes);
      return;
    }
  }
};

  useEffect(() => {
    initiallizeVector();
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              { headBox.length > 0 &&
                  headBox.map((index) => 
                    (<TableCell align="center">{index}</TableCell>)
                  )
              }
            </TableRow>
          </TableHead>
          {boxesState.length > 0 && (
            <TableBody>
                <TableRow
                  key={1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {boxesState.map((box) => (
                    <TableCell component="th" scope="box" align="center">
                      {box}
                    </TableCell>
                  ))}
                </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Button variant='outlined' onClick={markThreeBoxesWithX}>Mark 3 boxes with -1</Button>
    </Fragment>
  );
}

export default Vector;