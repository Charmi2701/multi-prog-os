import React from 'react'
import {Navbar} from 'react-bootstrap';
import logo from '../assets/ty52.png';

function MOSNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="100"
                    height="45"
                    className="d-inline-block align-top"
                />{' '}
                <span style={{fontWeight:'bold', fontSize:'30px', color:'#D9A63F', fontFamily:'sans-serif', marginLeft:'5px'}}>Multi Programming Operating System</span>
                </Navbar.Brand>
            </Navbar>
        </>
    )
}

export default MOSNavbar
