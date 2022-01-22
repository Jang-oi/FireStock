import {Backdrop, CircularProgress} from "@mui/material";
import {Fragment} from "react";

const Loading = () => {
    return (
        <Fragment>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
                <CircularProgress color="primary"/>
            </Backdrop>
        </Fragment>
    )
}

export default Loading;
