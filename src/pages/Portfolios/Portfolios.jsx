import 'styles/Portfolios.scss'
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {axiosCall} from "../../utils/commonUtil";
import {setPortFolioData} from "../../modules/portFolios";

const Portfolios = () => {

    const dispatch = useDispatch();

    const userInfo = useSelector(store => store.userInfo.userInfo);
    useEffect(() => {
        axiosCall.get('/portfolio/find/folio', {userId: userInfo._id}, function(returnData) {
            dispatch(setPortFolioData(returnData.portFolioDetailMap));
        })
    }, [])

    const portFolios = useSelector(store => store.portFolios.portData);
    console.log(portFolios);
    return (
        <div className="main-Container">
            <div className="inner-Container">
                <div className="btn-Container">
                    <Button variant="primary">추가하기</Button>
                    <Button variant="success">모아보기</Button>
                </div>
            </div>
        </div>
    )
}

export default Portfolios;