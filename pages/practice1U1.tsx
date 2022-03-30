import { Typography, Button } from "@mui/material";

import EmployeeFormModal from "../components/practice1U1/EmployeeFormModal/index";
import EmployeesList from "../components/practice1U1/EmployeesList/index";

import { DataProvider } from "../context/DataContext";
import { ActionsProvider } from "../context/ActionsContext";

const Practice1U1 = () => {
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

export default Practice1U1;