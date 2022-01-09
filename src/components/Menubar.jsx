import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {customAlert} from "utils/commonUtil";
import {useDispatch} from "react-redux";
import {initUserInfo} from "modules/userInfo";

const Menubar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isToken = localStorage.getItem('token')

    const onLogOutHandler = () => {
        customAlert({
            icon             : 'warning',
            title            : '로그아웃 하시겠습니까?',
            showCancelButton : true,
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                dispatch(initUserInfo());
                navigate('/sign-in');
            }
        })
    }

    /**
     * 로그인 여부를 통해 조회되는 메뉴 리턴
     * @returns {JSX.Element}
     */
    const getMenuElement = () => {
        return isToken ? <Nav>
                <NavDropdown title="마이 페이지" id="basic-nav-dropdown">
                    <Link to="/my-page" className="dropdown-item">계정 관리</Link>
                    <NavDropdown.Divider />
                    <Link to="/trade-history" className="dropdown-item">거래 내역</Link>
                </NavDropdown>
                <Nav.Link onClick={onLogOutHandler}>로그아웃</Nav.Link></Nav>
                       : <Nav><Link to="/sign-in" className="nav-link">로그인</Link><Link to="/sign-up" className="nav-link">회원가입</Link></Nav>
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand">Fire-Stock</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/portfolios" className="nav-link">포트폴리오</Link>
                    </Nav>
                    {getMenuElement()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Menubar