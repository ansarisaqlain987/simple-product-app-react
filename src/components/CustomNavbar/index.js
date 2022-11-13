import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar({ handleOpen }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Product</Navbar.Brand>
                <Button variant="primary" onClick={() => handleOpen()}>Add Product</Button>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;