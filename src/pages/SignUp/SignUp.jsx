import {useNavigate} from "react-router-dom";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import 'styles/Sign.scss'
import {useState} from "react";
import {axiosCall} from "utils/commonUtil";

const SignUp = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [idMsg, setIdMsg] = useState('');
    const [pwMsg, setPwMsg] = useState('');

    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    /**
     *
     * @param e
     * ID 입력 시 중복확인, 유효성 검사 진행
     */
    const onIdHandler = (e) => {
        const idRegex = /^[a-zA-Z0-9]{4,12}$/
        const currentId = e.currentTarget.value;
        setId(currentId);

        if (!idRegex.test(currentId)) {
            setIdMsg('ID는 4~12글자의 영문 숫자로만 입력해주세요.');
            setIsId(false);
        } else {
            setIdMsg('올바른 형식입니다. ');
            setIsId(true);
        }
    }

    /**
     *
     * @param e
     * Pw 입력 시 유효성 검사
     */
    const onPwHandler = (e) => {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const currentPw = e.currentTarget.value
        setPw(currentPw);
        if (!pwRegex.test(currentPw)) {
            setPwMsg('숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.');
            setIsPw(false);
        } else {
            setPwMsg('올바른 형식입니다. ');
            setIsPw(true);
        }
    }

    /**
     *
     * @param e
     * 회원가입 버튼 클릭 시 이벤트
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let registerData = {
            _id     : id,
            password: pw
        }
        axiosCall.post('auth/join', registerData, function() {
            navigate('/sign-in');
        })
    }

    return (
        <div className="main-Container">
            <div className="inner-Container">
                <Form className={"form-Container"}>
                    <FloatingLabel controlId="signUpId" label="아이디를 입력해주세요." className="mb-3">
                        <Form.Control type="text" placeholder="id" value={id} onChange={onIdHandler}/>
                        <Form.Text className={`message ${isId ? 'true' : 'false'}`}>{idMsg}</Form.Text>
                    </FloatingLabel>
                    <FloatingLabel controlId="signUpPw" label="비밀번호를 입력해주세요." className="mb-3">
                        <Form.Control type="password" placeholder="password" value={pw} onChange={onPwHandler}/>
                        <Form.Text className={`message ${isPw ? 'true' : 'false'}`}>{pwMsg}</Form.Text>
                    </FloatingLabel>
                    <Button className="signUp-Form-Btn" variant="primary" type="submit" disabled={!(isId && isPw)}
                            onClick={onSubmitHandler}>
                        회원가입
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignUp;