import { Typography, Button } from "@mui/material";

import EmployeeFormModal from "../components/examU1/EmployeeFormModal/index";
import EmployeesList from "../components/examU1/EmployeesList/index";

import { ExamU1Provider } from "../context/ExamU1Context";
import { ActionsProvider } from "../context/ActionsContext";

const ExamU1 = () => {
    return (
        <ExamU1Provider>
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
        </ExamU1Provider>
    );
};

export default ExamU1;