import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useHistory } from 'react-router-dom';

function Header() {
  const { signout } = useAuth();
  let history = useHistory();

  const handleSignout = async () => {
    await signout();
    history.push('/web/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/web/">Desafio Shopify</Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link
            style={{
              color: 'white',
              margin: '0px 10px',
              textDecoration: 'none',
            }}
            to="/web/"
          >
            Produtos
          </Link>
          <Link
            style={{
              color: 'white',
              margin: '0px 10px',
              textDecoration: 'none',
            }}
            to="/web/lista"
          >
            Minha Lista
          </Link>
          <span
            style={{ color: 'white', margin: '0px 10px', cursor: 'pointer' }}
            onClick={() => handleSignout()}
          >
            Sair
          </span>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
