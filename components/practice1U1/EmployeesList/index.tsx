import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Delete as DeleteIcon, FilterList as FilterListIcon, AddCircle as AddCircleIcon, Edit as EditIcon} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';

import { v4 as uuid } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import { ActionsContext } from '../../../context/ActionsContext';
import EmployeeFormModal from '../EmployeeFormModal'

interface Data {
  id: string,
  name: any;
  surnames: string;
  dateOfBirth: string;
  age: number;
  genre: string;
  interests: string;
}

function createData(
  id: string,
  name: any,
  surnames: string,
  dateOfBirth: string,
  age: number,
  genre: string,
  interests: string,
): Data {
  return {
    id,
    name,
    surnames,
    dateOfBirth,
    age,
    genre,
    interests,
  };
}

/* let rows = [
  createData(uuid(), 'Jorge', 'Trad', '22/11/1999', 22, 'Male', 'Soccer, Volleyball, Athletics'),
]; */

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'surnames',
    numeric: false,
    disablePadding: true,
    label: 'Surnames',
  },
  {
    id: 'dateOfBirth',
    numeric: false,
    disablePadding: true,
    label: 'Date of Birth',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
  {
    id: 'genre',
    numeric: false,
    disablePadding: true,
    label: 'Genre',
  },
  {
    id: 'interests',
    numeric: false,
    disablePadding: true,
    label: 'Areas of Interests',
  },
];


interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EnhancedTableToolbar = ({ numSelected, setOpenModal }) => {

  const [open, setOpen] = React.useState(false);

  const { actionEmployeeFlag, setActionEmployeeFlag } = useContext(ActionsContext);

  const handlerClickOpen = () => {
    setOpen(true);
  };

  const handlerClose = () => {
    setOpen(false);
  };


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Employees List
          </Typography>
        </div>
      )}
      {numSelected > 0 ? (
        <div style={{ display: 'flex' }}>
          <Tooltip title="Delete">
            <IconButton
              
              onClick={() => { 
                setActionEmployeeFlag(3);
                handlerClickOpen();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Create">
            <IconButton onClick={() => {
              setOpenModal(true);
              setActionEmployeeFlag(1);
            }}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
      )}
      { numSelected == 1 && (
        <Tooltip title="Edit">
          <IconButton onClick={() => {
              setActionEmployeeFlag(2);
              setOpenModal(true);
            }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handlerClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete employee data?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Selected users will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerClose}>No</Button>
          <Button onClick={handlerClose}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
};

const EmployeesList = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);

  const [ openModal, setOpenModal ] = React.useState(false);
  //const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /* const [ dataToSave, setDataToSave ] = React.useState(); */

  const [ rows, setRows ] = React.useState([]);
  

  const { data, setData, rowsJSON, setRowsJSON } = useContext(DataContext);
  const { actionEmployeeFlag, setActionEmployeeFlag } = useContext(ActionsContext);

  



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const createEmployee = (employee) => {
    let interestsFormatted = '';
    employee.interests.football && (interestsFormatted = 'Football, ')
    employee.interests.volleyball && (interestsFormatted += 'Volleyball, ')
    interestsFormatted += employee.interests.other;

    setRows((rows) => [
      ...rows, 
      createData(
        uuid(), 
        employee.name, 
        employee.surnames,
        employee.dateOfBirth, 
        employee.age, 
        employee.genre, 
        interestsFormatted)
      ])
  }

  React.useEffect(() => {
    (actionEmployeeFlag == 1 && data) && (createEmployee(data));
  }, [ data ]);

  return (
    <div>
      <EmployeeFormModal openModal={openModal} setOpenModal={setOpenModal} />
      <Box sx={{ m: 2 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length}  setOpenModal={setOpenModal} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>{/* 
                        <TableCell align="right">{row.name}</TableCell> */}
                        <TableCell align="center">{row.surnames}</TableCell>
                        <TableCell align="center">{row.dateOfBirth}</TableCell>
                        <TableCell align="center">{row.age}</TableCell>
                        <TableCell align="center">{row.genre}</TableCell>
                        <TableCell align="center">{row.interests}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        
      </Box>
    </div>
  );
}

export default EmployeesList;