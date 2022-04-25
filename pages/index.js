import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import { Navbar, Container, Nav, } from 'react-bootstrap';
import { Button, Table } from 'react-bootstrap';
import styles from './users/Dir.module.css';

import { database } from "../public/firebase.js";
import { ref, onValue, child, get } from "firebase/database";

const Index = () => {
  const router = useRouter();
  const [data, updateData] = useState({});
  
  useEffect(() => {
    let dirRef = ref(database, 'users/');
    onValue(dirRef, (snapshot) => {
      const newData = snapshot.val();
      updateData(newData)
    });
  })

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Account Registry</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Directory</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1 className="header">User Directory</h1>
      <Container>
        <Table hover>
          <thead>
            <tr>
              <th>Redirect</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(user => 
            
              <tr key={user[0]} onDoubleClick={() => window.location.assign(`/users/${user[0]}`)}>
                <td>
                  <Button variant="primary" onClick={() => window.location.assign(`/users/${user[0]}`)}>
                    Visit
                  </Button>
                </td>
                <td>
                  {user[1].username}
                </td>
                <td>
                  {user[1].email}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Index