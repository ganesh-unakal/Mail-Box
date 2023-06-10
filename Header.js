import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { authActions } from './store/authentication'
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {

  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.auth.isAuthenticated)
  console.log(authActions)
  const logoutHandler = () => {
    dispatch(authActions.logout())
  }


  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand className='text-info' style={{ fontWeight: 'bold' }}>
          Mail Box
        </Navbar.Brand>

        <Nav className='me-auto m-1'>
          {!isLoggedin && <Link to='/login' className='text-light text-decoration-none m-2'>
            Login
          </Link>}

          {isLoggedin && <Link to='/compose' className='text-light text-decoration-none m-2'>
            ComposeEmail
          </Link>}

          {isLoggedin && <Link to='/inbox' className='text-light text-decoration-none m-2'>
            Inbox
          </Link>}

          {isLoggedin && <Link to='/sent' className='text-light text-decoration-none m-2'>
            Outbox
          </Link>}

          {isLoggedin && <Link
            to='/login'
            className='text-light text-decoration-none m-2'
            onClick={logoutHandler}>
            logout
          </Link>}

         
        </Nav>
      </Container>

    </Navbar>
  )
}

export default Header;