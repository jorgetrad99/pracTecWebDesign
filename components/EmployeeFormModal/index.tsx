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
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
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

const EmployeeForm = () => {
  const [value, setValue] = useState(Date.now());

  const [ employeeData, setEmployeeData ] = useState<Data>({
    name: "",
    surnames: "",
    dateOfBirth: "",
    age: 0,
    genre: "",
    interests: "",
  });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ display: 'flex', maxWidth: '50rem', flexDirection: 'column', marginTop: '2rem', margin: '0 auto', position: 'relative' }}>
      <br />
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={3} sx={{ width: 'inherit' }}>
          <TextField
            fullWidth
            /* sx={{
              width: 'auto', 
            }} */
            id='outlined-basic'
            label='Employee name'
            variant='outlined'/* 
            onChange={setEmployeeData({{ name: "" }})} */
          />
          <TextField
            fullWidth
            /* sx={{
              width: 'auto',
            }} */
            id='outlined-basic'
            label='Surnames'
            variant='outlined'
          />
        </Stack>
      </Container>
      <Container sx={{ margin: '2rem 0' }}>
        <Stack spacing={3} direction="row" sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
          <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                  label="Birth Date"
                  inputFormat="DD/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
          <TextField
            id="outlined-read-only-input"
            label="Age"
            defaultValue="0"
            disabled
            
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
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormGroup>
            <FormLabel id="demo-radio-buttons-group-label">Areas of interest</FormLabel>
            <FormControlLabel control={<Checkbox />} label="Football" />
            <FormControlLabel control={<Checkbox />} label="Volleyball" />
            
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel control={<Checkbox />} label="Other" />
              <TextField id="standard-basic" label="" variant="standard" />
            </div>
          </FormGroup>
        </Stack>
      </Container>
    </Container>
  );
};

export default EmployeeFormModal;
