import {Box, Container, Typography} from "@mui/material";

const Footer = () => {

    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6}}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    FireStock
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    for FIRE
                </Typography>
            </Container>
        </Box>
    )
}
export default Footer;