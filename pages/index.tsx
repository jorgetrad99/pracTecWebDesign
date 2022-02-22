import { Typography, Button } from "@mui/material";

import EmployeeFormModal from "../components/EmployeeFormModal/index";
import EmployeesList from "../components/EmployeesList/index";

import { DataProvider } from "../context/DataContext";

const Home = () => {
    return (
        <DataProvider>
            <Typography 
                variant='h4' 
                component='h3' 
                align="center" 
                margin={5}
            >
                    This a Eemployees Managment System
            </Typography>
            <br /><br />
            <EmployeeFormModal  />
            <EmployeesList />
        </DataProvider>
    );
};

export default Home;