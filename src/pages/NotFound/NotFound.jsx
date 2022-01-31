import {Box, Container, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Container>
            <Box sx={{width: '100%', height: 600, textAlign:'center', alignItems:'center', display:'grid'}}>
                <Typography>
                    페이지를 찾을 수 없습니다.
                </Typography>
            </Box>
        </Container>
    )
}

export default NotFound;