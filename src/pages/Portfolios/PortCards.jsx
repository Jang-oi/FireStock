import {useNavigate} from "react-router-dom";
import {axiosCall, customAlert} from "utils/commonUtil";
import {
    Card, CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    Typography
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";

const PortCards = ({portFolios, userInfo, changeState}) => {

    const navigate = useNavigate();
    /**
     * 포트폴리오 삭제 이벤트
     * @param currentName
     */
    const onPortDeleteHandler = (currentName) => {
        customAlert({
            icon             : 'question',
            title            : `${currentName}를 
                                삭제 하시겠습니까?`,
            showCancelButton : true,
            confirmButtonText: 'OK',
            cancelButtonText : 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const params = {
                    userId       : userInfo._id,
                    portFolioName: currentName
                };
                axiosCall.get('portfolio/delete/foliodetail', params, function () {
                    changeState();
                })
            }
        });
    }

    return (
        <Grid container>
            {Object.keys(portFolios).map((value, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} mt={2} key={index}>
                    <Card sx={{minWidth: 280, display: "flex"}}
                          onMouseOver={() => document.getElementById(`delete-${index}`).style.display = 'block'}
                          onMouseOut={() => document.getElementById(`delete-${index}`).style.display = 'none'}
                    >
                        <CardActionArea onClick={() => {
                            navigate(`/portfolios/${value}`)
                        }}>
                            <CardContent sx={{display: 'block', overflow: 'hidden'}}>
                                <CardHeader sx={{display: "block", overflow: "hidden"}} title={value}
                                            titleTypographyProps={{noWrap: true}}/>
                                <Typography component="p" variant="body2" color="text.secondary">
                                    포트폴리오 종류 : {portFolios[value].portFolioType}<br/>
                                    Created At : {portFolios[value].regDt}<br/>
                                    Updated At : {portFolios[value].upDt}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <IconButton aria-label="settings" sx={{alignItems: 'flex-start', mt: 2}} onClick={() => {
                            onPortDeleteHandler(value)
                        }}>
                            <DeleteForeverIcon id={`delete-${index}`} sx={{display: 'none'}}/>
                        </IconButton>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default PortCards