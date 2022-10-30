import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from "../../utils/axios";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../auth/services";
import { verifyTokenAsync } from "../auth/asyncActions";

const Stats = () => {
    const [credits, setCredits] = React.useState([]);
    const [deposits, setDeposits] = React.useState([]);
    const dispatch = useDispatch();
    const authObj = useSelector((state) => state.auth);

    React.useEffect(() => {
        dispatch(verifyTokenAsync());
        setAuthToken(authObj.token);
        const fetchData = async () => {
            const creditRes = await axios.get(
                "/api/v1/checkout/payments/?type=credits"
            );
            setCredits(creditRes.data);
            const depositRes = await axios.get(
                "/api/v1/checkout/payments/?type=deposits"
            )
            setDeposits(depositRes.data);
        };
        fetchData();
    }, []);

    return (
        <Grid container spaing={2} sx ={{justifyContent: "center"}}>
            <Grid item xs={2}>
                <Card sx={{ minWidth: 150, maxWidth: 150 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 13 }} variant="h5">
                            Total Transactions
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
                            {credits.length + deposits.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card sx={{ minWidth: 150, maxWidth: 150 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 13 }} variant="h5">
                            Total Credits
                        </Typography>
                        <Typography sx={{ fontSize: 20 ,fontWeight: "bold"}} variant="h5">
                            {credits.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card sx={{ minWidth: 150, maxWidth: 150 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 13 }} variant="h5">
                            Total Deposits
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
                           {deposits.length} 
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card sx={{ minWidth: 150, maxWidth: 150 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 13}} variant="h5">
                            Transactions Failed
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
                            0
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Stats