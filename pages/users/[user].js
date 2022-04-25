import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';


import { Navbar, Container, Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styles from './Dir.module.css';

import { database } from "../../public/firebase.js";
import { ref, onValue} from "firebase/database";

const User = () => {

    const router = useRouter()
    const { user } = router.query

    const [data, updateData] = useState({});
    
    useEffect(() => {
        let dirRef = ref(database, 'users/' + user);
        onValue(dirRef, (snapshot) => {
          const newData = snapshot.val();
          console.log(newData)
          updateData(newData)
        });
    })

    const getVal = (val) => {
        if (data==null) {
            setTimeout(
                ()=>{console.log("waiting")},
                150
            )
        } else {
            if (val=="username") return (data.username);
            else if (val=="password") return (data.password);
            else if (val=="email") return (data.email);
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
            
            <div className="header">
                <h1>{getVal("username")}</h1>
                <h5 style={{color: "gray"}}>{getVal("password")}</h5>
            </div>

            <div className={styles.main}>
                <Button size="lg" className={styles.emailButton}>
                    <h3 className={styles.buttonText}>{getVal("email")}</h3>
                </Button>
            </div>
            
            
        </div>
    )
}

export default User