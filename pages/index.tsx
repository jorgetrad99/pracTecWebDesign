import { Typography, Button } from "@mui/material";

import EmployeeFormModal from "../components/EmployeeFormModal/index";
import EmployeesList from "../components/EmployeesList/index";

import { DataProvider } from "../context/DataContext";
import { ActionsProvider } from "../context/ActionsContext";

const Home = () => {
    return (
        <DataProvider>
            <ActionsProvider>
                <Typography 
                    variant='h4' 
                    component='h3' 
                    align="center" 
                    margin={5}
                >
                        This a Eemployees Managment System
                </Typography>
                <EmployeesList />
            </ActionsProvider>
        </DataProvider>
    );
};

export default Home;