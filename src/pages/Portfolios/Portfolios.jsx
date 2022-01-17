import 'styles/Portfolios.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {setPortFolioData} from "modules/portFolios";
import PortCards from "./PortCards";
import PortModal from "./PortModal";
import {Container, Fab, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Portfolios = () => {

    // TODO 모아보기 진행.

    const dispatch = useDispatch();

    const [isModalShow, setIsModalShow] = useState(false);

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const portFolios = useSelector(store => store.portFolios.portData);
    /**
     * 접속한 아이디에 해당하는 포트폴리오를 세팅함.
     */
    useEffect(() => {
        axiosCall.get('/portfolio/find/folio', {userId: userInfo._id}, function (returnData) {
            dispatch(setPortFolioData(returnData.portFolioDetailMap));
        })
    }, [dispatch, userInfo._id, isModalShow])

    /**
     * Modal 창이 닫힐 때 이벤트
     */
    const onChangeHandler = () => {
        setIsModalShow(false);
    }

    /**
     * 포트폴리오 추가버튼 클릭 시 이벤트
     */
    const onPortAddHandler = () => {
        setIsModalShow(true);
    }

    return (
        <Container>
            <PortCards portFolios={portFolios} userInfo={userInfo}/>
            <Box sx={{mt:3, mx:3, textAlign: 'center'}}>
                <Fab color="primary" aria-label="add" onClick={onPortAddHandler}><AddIcon/></Fab>
            </Box>
            <PortModal userInfo={userInfo} show={isModalShow} changeState={onChangeHandler}/>
        </Container>
    )
}

export default Portfolios;