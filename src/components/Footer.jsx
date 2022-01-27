import {Box, Container, Typography} from "@mui/material";

const Footer = () => {

    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6}}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    FireStock
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" component="p">
                    주가 정보는 오전 6시 오후 6시에 업데이트 됩니다.
                </Typography>
            </Container>
        </Box>
    )
}
export default Footer;