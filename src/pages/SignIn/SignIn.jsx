import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import 'styles/Sign.scss'
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {useDispatch} from "react-redux";
import {setUserInfo} from "modules/userInfo";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const [isSave, setIsSave] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['saveId']);
    const cookieMaxAge = 2*60*60*1000;

    /**
     * 쿠키에 아이디가 저장되어 있으면 입력 해주는 로직
     */
    useEffect(() => {
        if (cookies.saveId) {
            setId(cookies.saveId);
            setIsSave(true);
            setIsId(true);
        }
    }, [cookies.saveId]);

    /**
     * ID 입력 시 이벤트
     * @param e
     */
    const onIdHandler = (e) => {
        const currentId = e.currentTarget.value;
        setId(currentId);
        if (currentId === '') setIsId(false);
        else setIsId(true);
    }

    /**
     * ID 저장하기 체크 이벤트
     * @param e
     */
    const onIdSaveHandler = (e) => {
        const currentCheck = e.target.checked;
        setIsSave(currentCheck);
        if (currentCheck) {
            setCookie('saveId', id, {maxAge: cookieMaxAge});
        } else {
            removeCookie('saveId');
        }
    }

    /**
     * PW 입력 이벤트
     * @param e
     */
    const onPwHandler = (e) => {
        const currentPw = e.currentTarget.value;
        setPw(currentPw);
        if (currentPw === '') setIsPw(false);
        else setIsPw(true);
    }

    /**
     * 로그인 버튼 클릭시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const signInData = {
            _id     : id,
            password: pw
        }
        if (isSave) setCookie('saveId', id, {maxAge: cookieMaxAge});
        axiosCall.post('auth/login', signInData, function (returnData) {
            dispatch(setUserInfo(returnData));
            localStorage.setItem('token', returnData.token);
            navigate('/');
        })
    }


    return (
        <div className="main-Container">
            <div className="inner-Container">
                <Form className="form-Container">
                    <FloatingLabel controlId="signInId" label="아이디를 입력해주세요." className="mb-3">
                        <Form.Control type="text" placeholder="ID" value={id} onChange={onIdHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="signInPw" label="비밀번호를 입력해주세요." className="mb-3">
                        <Form.Control type="password" placeholder="password" value={pw} onChange={onPwHandler}/>
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="아이디 저장하기" checked={isSave} onChange={onIdSaveHandler}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button className="signIn-Form-Btn" variant="primary" type="submit" disabled={!(isId && isPw)}
                            onClick={onSubmitHandler}>
                        로그인
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn;