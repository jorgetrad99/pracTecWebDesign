import { Typography, Button } from "@mui/material";

import EmployeeFormModal from "../components/EmployeeFormModal/index";
import EmployeesList from "../components/EmployeesList/index";

const Home = () => {
    return (
        <div>
            <Typography variant='h4' component='h3'>This the home page</Typography>
            <Typography variant='h4' component='h3'>Employee General Data</Typography>
            <EmployeeFormModal />
            <EmployeesList />
        </div>
    );
};

export default Home;