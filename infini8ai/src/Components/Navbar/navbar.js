import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';

import logo from '../../Images/logo.png'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className='grey-box-shadow' color="white" light expand="md">
                <Container>
                    <NavbarBrand href="/"><img className='nav-logo' src={logo}></img></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>

                        {/* <NavbarText  className="m-auto"></NavbarText> */}
                        <Nav className='ml-auto nav-links align-items-center' navbar>
                            <NavItem className="margin-right-20">
                                <NavLink href="">Services</NavLink>
                            </NavItem>
                            <NavItem className="margin-right-20">
                                <NavLink href="">Sectors</NavLink>
                            </NavItem>
                            <NavItem className="margin-right-20">
                                <NavLink href="">Products</NavLink>
                            </NavItem>
                            <NavItem className="margin-right-20">
                                <NavLink href="">Clients</NavLink>
                            </NavItem>
                            <NavItem >
                                <Button className='border-btn nav-links' >Get a quote</Button>
                            </NavItem>


                            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
           */}
                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>
        </div>
    );
}

export default Header;