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
  const [ surnames, setSurnames ] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState<any>(new Date());
  const [ workingHours, setWorkingHours ] = useState(0);
  const [ earningsPerHour, setEarningsPerHour ] = useState(0);
  const [ netSalary, setNetSalary ] = useState(0);

  const [ genre, setGenre ] = useState("Female");
  /* const [ interests, setInterests ] = useState<Interests[]>([]); */
  const [ footballChecked, setFootballChecked ] = useState(false);
  const [ volleyballChecked, setVolleyballChecked ] = useState(false);
  const [ otherChecked, setOtherChecked ] = useState(false);
  const [ otherInterest, setOtherInterest ] = useState("");

  const calculateworkingHours = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var workingHours = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        workingHours--;
    }
    setWorkingHours(workingHours);
  }

  const getFormData = () => {
    return {
      name: name,
      surnames: surnames,
      dateOfBirth: moment(dateOfBirth).format('DD/MM/YYYY'),
      workingHours: workingHours,
      genre: genre,
      interests: {
        football: footballChecked,
        volleyball: volleyballChecked,
        other: otherInterest
      }
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
    setSurnames("");
    setDateOfBirth(new Date());
    setWorkingHours(0);
    setGenre("Female");

    setFootballChecked(false);
    setVolleyballChecked(false);
    setOtherChecked(false);
    setOtherInterest("");
  }

  useEffect(() => {
    if(workingHours > 0 && earningsPerHour > 0) {
      setNetSalary(workingHours * earningsPerHour);
    } else {
      setNetSalary(0);
    }
  }, [ earningsPerHour, workingHours ]);

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
          <TextField
            fullWidth
            value={surnames}
            id='outlined-basic'
            label='Surnames'
            variant='outlined'
            onChange={ (e) => setSurnames(e.target.value) }
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
            label="Salario bruto"
            defaultValue="0"
            disabled
            value={netSalary}
          />
        </Stack>
        <br />
        <Stack spacing={3} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Female"
              name="radio-buttons-group"
              onChange={ (e) => setGenre(e.target.value) }
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormGroup
            
          >
            <FormLabel id="demo-radio-buttons-group-label">Areas of interest</FormLabel>
            <FormControlLabel /* value={footballChecked} */ control={<Checkbox checked={footballChecked} onChange={ 
              (e) => { 
                setFootballChecked(e.target.checked)
              }  
            }/> } label="Football" />
            <FormControlLabel /* value={volleyballChecked} */ control={<Checkbox checked={volleyballChecked} onChange={ 
              (e) => {
                setVolleyballChecked(e.target.checked)
              }  
            }/> } label="Volleyball" />
            
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel /* value={otherChecked} */ control={<Checkbox checked={otherChecked} onChange={ 
              (e) => {
                setOtherChecked(e.target.checked)
              }  
            }/> } label="Other" />
              <TextField id="standard-basic" disabled={ !otherChecked } value={otherInterest} label="" variant="standard" 
                onChange={ (e) => setOtherInterest(e.target.value) } />
            </div>
          </FormGroup>
        </Stack>
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
