import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { InputGroup, Button, Form } from 'react-bootstrap';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database, auth } from "../public/firebase.js";


const Signup = () => {

  const [errors, updateErrors] = useState({});

  const newUser = (auth, email, password, username) => createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      updateErrors({});
      setTimeout(() => {ALERT()}, 150);
      writeUserData(user.uid, email, password, username);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const currentErrors = {};
      if (errorCode==='auth/invalid-email') {
        currentErrors.email = "Invalid email";
      }
      updateErrors(currentErrors);
    });

    const writeUserData = async (id, email, password, username) => {
      let nodeRef = ref(database, 'users/' + id);
      await set(nodeRef, {
        username,
        email,
        password
      });
    }

  const checkErrors = ([ username, email, password]) => {
    const currentErrors = {};
    
    if (password.length < 8) currentErrors.password = "Password must be at least 8 characters.";
    else if (password.length > 30) currentErrors.password = "Password too long.";

    if ([-1, 0, email.length-1].includes(email.indexOf('@'))) currentErrors.email = "Invalid email";

    if (username.length == 0) currentErrors.username = "Please enter your username."
    else if (username.includes(" ")) currentErrors.username = "Username cannot include spaces.";

    return currentErrors;
  }

  async function ALERT() {
    await new Promise(resolve => alert('Account Registered.'))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formInput = [0,1,2].map((val) => (event.target[val].value));
    const currentErrors = checkErrors(formInput);

    if (Object.keys(currentErrors).length > 0) {
      updateErrors(currentErrors)
    } else {
      event.stopPropagation();

      newUser(auth, formInput[1], formInput[2], formInput[0]);
    }
  }

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
      <h1 className="header">Sign Up</h1>
      <div className="body">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" id="newUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup> 
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control 
              type="username" 
              placeholder="Enter Username"
              isInvalid={ !!errors.username } />
              <Form.Control.Feedback type='invalid'>
                { errors.username }
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4" id="newEmail">
            <Form.Label>Email Address</Form.Label>
            <InputGroup> 
              <Form.Control 
              placeholder="Enter Email"
              isInvalid={ !!errors.email }/>
              <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
              <Form.Control.Feedback type='invalid'>
                { errors.email }
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-5" id="newPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Enter Password"
            isInvalid={ !!errors.password } />
            <Form.Control.Feedback type='invalid'>
                { errors.password }
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" style={{width:"100%"}}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Signup