import {Link, Typography} from "@mui/material";

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">Fire Stock</Link> 2022
        </Typography>
    );
}

export default Copyright;