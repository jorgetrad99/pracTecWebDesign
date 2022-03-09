import { useState, forwardRef, useContext, useEffect } from 'react';


import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Container, TextField, Stack, FormControl, 
        FormLabel, Checkbox, RadioGroup, FormGroup, 
        FormControlLabel, Radio, Slide, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import { TransitionProps } from '@mui/material/transitions';

import moment from 'moment';

import { ExamU1Context } from '../../../context/ExamU1Context';
import { TryRounded } from '@mui/icons-material';
import { ActionsContext } from '../../../context/ActionsContext';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;

  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeFormModal = ({ openModal, setOpenModal }) => {
  const [open, setOpen] = useState(false);
  /* const [ data, setData ] = useState<any>(); */

  const { data, setData, rowsJSON, setRowsJSON } = useContext(ExamU1Context);
  const { actionEmployeeFlag, setActionEmployeeFlag } = useContext(ActionsContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

  const findEmployee = () => {

  }

  useEffect(() => {
    //Create Employee
    actionEmployeeFlag == 1 && (openModal && handleClickOpen())
    //Update Employee
    actionEmployeeFlag == 2 && (openModal && (
      findEmployee(),
      handleClickOpen()
    )
    )

  }, [ actionEmployeeFlag, openModal ]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Employee"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Fill this form to create an user
          </DialogContentText>
          <EmployeeForm setData={setData} data={data} setRowsJSON={setRowsJSON} rowsJSON={rowsJSON} closeModal={handleClose} />
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

interface Data {
  name: string;
  surnames: string;
  dateOfBirth: Date | null;
  workingHours: number;
  genre: string;
  interests: any;
}

interface Interests {
  football: boolean;
  volleyball: boolean;
  other: string;
}

const EmployeeForm = ({ setData, data, closeModal, setRowsJSON, rowsJSON }) => {
  /* const [value, setValue] = useState(Date.now()); */

  /* const [ employeeData, setEmployeeData ] = useState<Data>({
    name: "",
    surnames: "",
    dateOfBirth: "",
    workingHours: 0,
    genre: "",
    interests: "",
  }); */

  const [ name, setName ] = useState("");
  const [ workingHours, setWorkingHours ] = useState(0);
  const [ earningsPerHour, setEarningsPerHour ] = useState(0);
  const [ grossSalary, setGrossSalary ] = useState(0);
  const [ deductions, setDeductions ] = useState(0);
  const [ netSalary, setNetSalary ] = useState(0);

  const getFormData = () => {
    return {
      name: name,
      workingHours: workingHours,
      earningsPerHour: earningsPerHour,
      grossSalary: grossSalary,
      deductions: deductions,
      netSalary: netSalary
    }
  }

  const saveData = () => {
    const formData = getFormData();
    setData(formData);
    cleanFields();
  }

  const updateData = () => {
    const formData = getFormData();
    
  }

  const cleanFields = () => {
    setName("");
    setWorkingHours(0);
    setEarningsPerHour(0);
    setGrossSalary(0);
    setDeductions(0);
    setNetSalary(0);
  }

  useEffect(() => {
    if(workingHours > 0 && earningsPerHour > 0) {
      setGrossSalary(workingHours * earningsPerHour);
    } else {
      setGrossSalary(0);
    }
  }, [ earningsPerHour, workingHours ]);

  useEffect(() => {
    if(grossSalary > 0 && deductions > 0) {
      setNetSalary(grossSalary - deductions);
    } else {
      setNetSalary(0);
    }
  }, [ grossSalary, deductions ]);

  return (
    <Container sx={{ display: 'flex', maxWidth: '50rem', flexDirection: 'column', marginTop: '2rem', margin: '0 auto', position: 'relative' }}>
      <br />
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={3} sx={{ width: 'inherit' }}>
          <TextField
            fullWidth
            value={name}
            id='outlined-basic'
            label='Employee name'
            variant='outlined'
            onChange={ (e) => setName(e.target.value) }
          />
        </Stack>
      </Container>
      <Container sx={{ margin: '2rem 0' }}>
        <Stack spacing={3} direction="row" sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
          <TextField
            label="Working hours"
            defaultValue="0"
            value = {workingHours}
            onChange={(e) => setWorkingHours(Number(e.target.value))}
          />
          <TextField
            label="Earnings per hour"
            defaultValue="0"
            value = {/* "$" +  */earningsPerHour}
            onChange={(e) => (setEarningsPerHour(Number(e.target.value/* .substring(1) */)))}
          />
          <TextField
            id="outlined-read-only-input"
            label="Gross Salary"
            defaultValue="0"
            disabled
            value={grossSalary}
          />
        </Stack>
        <br /><br />
        <Stack spacing={3} direction="row" sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
          <TextField
            label="Deductions"
            value = {deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
          />
          <TextField
            id="outlined-read-only-input"
            label="Net salary"
            disabled
            value={netSalary}
          />
        </Stack>
        <br />
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={() => {
            saveData()
            closeModal()
            }}>Save</Button>
        </DialogActions>
      </Container>
    </Container>
  );
};

export default EmployeeFormModal;
