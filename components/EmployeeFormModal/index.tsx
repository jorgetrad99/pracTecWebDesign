import { useState, forwardRef } from 'react';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Container, TextField, Stack, FormControl, 
        FormLabel, Checkbox, RadioGroup, FormGroup, 
        FormControlLabel, Radio, Slide, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions 
} from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeFormModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
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
          <EmployeeForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface Data {
  name: string;
  surnames: string;
  dateOfBirth: string;
  age: number;
  genre: string;
  interests: string;
}

interface Interests {
  football: boolean;
  volleyball: boolean;
  other: string;
}

const EmployeeForm = () => {
  /* const [value, setValue] = useState(Date.now()); */

  /* const [ employeeData, setEmployeeData ] = useState<Data>({
    name: "",
    surnames: "",
    dateOfBirth: "",
    age: 0,
    genre: "",
    interests: "",
  }); */
  const [ name, setName ] = useState("");
  const [ surnames, setSurnames ] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState<Date | null>(new Date());
  const [ age, setAge ] = useState(0);
  const [ genre, setGenre ] = useState("Female");
  const [ interests, setInterests ] = useState<Interests[]>([]);

  const calculateAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setAge(age);
  }

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
          <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                  label="Birth Date"
                  inputFormat="DD/MM/yyyy"
                  value={dateOfBirth}
                  onChange={ (e) => { 
                    setDateOfBirth(e) 
                    calculateAge(dateOfBirth)
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
          <TextField
            id="outlined-read-only-input"
            label="Age"
            defaultValue="0"
            disabled
            value = {age}
          />
        </Stack>
        <br />
        <Stack spacing={3} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
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
            <FormControlLabel control={<Checkbox onChange={ 
              /* (e) => { 
                e.target.value ? setInterests([...interests, {'football': true}])
              }  */
            }/>} label="Football" />
            <FormControlLabel control={<Checkbox onChange={ (e) => console.log(e.target.value) }/>} label="Volleyball" />
            
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel control={<Checkbox onChange={ (e) => console.log(e.target.value) }/>} label="Other" />
              <TextField id="standard-basic" label="" variant="standard" />
            </div>
          </FormGroup>
        </Stack>
      </Container>
    </Container>
  );
};

export default EmployeeFormModal;
