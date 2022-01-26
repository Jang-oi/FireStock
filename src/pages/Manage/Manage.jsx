import {Fragment, useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Manage = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo.roles !== 'ADMIN') navigate('/404');
    }, [navigate, userInfo.roles])

    return (
        <Fragment>

        </Fragment>
    )
}

export default Manage