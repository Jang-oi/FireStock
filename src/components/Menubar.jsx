import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Menubar = () => {

    const isToken = localStorage.getItem('token')

    /**
     * 로그인 여부를 통해 조회되는 메뉴 리턴
     * @returns {JSX.Element}
     */
    const getMenuElement = () => {
        return isToken ? <Nav><Link to="/my-page" className="nav-link">마이 페이지</Link><Nav.Link>로그아웃</Nav.Link></Nav>
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