import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import 'styles/Sign.scss'
import {useEffect, useState} from "react";
import {customAxios, defaultAxiosCall, defaultAxiosError} from "utils/commonUtil";
import {useDispatch} from "react-redux";
import {setUserInfo} from "modules/userInfo";
import {getReturnData} from "utils/stringUtil";
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
     *
     * @param e
     * ID 입력 이벤트
     */
    const onIdHandler = (e) => {
        const currentId = e.currentTarget.value;
        setId(currentId);
        if (currentId === '') setIsId(false);
        else setIsId(true);
    }

    /**
     *
     * @param e
     * ID 저장하기 체크 이벤트
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
     *
     * @param e
     * PW 입력 이벤트
     */
    const onPwHandler = (e) => {
        const currentPw = e.currentTarget.value;
        setPw(currentPw);
        if (currentPw === '') setIsPw(false);
        else setIsPw(true);
    }

    /**
     *
     * @param e
     * 로그인 버튼 클릭시 이벤트
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (isSave) setCookie('saveId', id, {maxAge: cookieMaxAge});
        const signInData = {
            _id     : id,
            password: pw
        }
        customAxios.post('auth/login', signInData)
            .then(response => {
                defaultAxiosCall(response, function() {
                    const returnData = getReturnData(response);
                    dispatch(setUserInfo(returnData));
                    localStorage.setItem('token', returnData.token);
                    navigate('/');
                });
            })
            .catch(response => {
                defaultAxiosError(response);
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