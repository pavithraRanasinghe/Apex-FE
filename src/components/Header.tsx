import { FC, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { getUserStorage } from "../common/PersistanceManager";
import { IUser } from "../interfaces/User";

const Header: FC = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const user: IUser = getUserStorage();
    if (user) {
      setName(user.name);
    } else {
      console.log("LOGOUT");
    }
  }, []);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="dashboard">Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="/" className="m-1">
            <Button>Track Shipment</Button>
          </Nav.Link>
          <Navbar.Text>Hi : {name}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
