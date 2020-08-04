import React, { useState } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

const labels = {
  Home: 'home',
  Demo: 'demo',
  Trend: 'trend',
  Profile: 'profile',
  Login: 'log in',
  Logout: 'log out',
}

const MenuLink = ({ to, onClick, children }) => (
  <NavLink
    tag={RouterNavLink}
    to={to || '#'}
    exact
    activeClassName="router-link-exact-active"
    onClick={onClick || undefined}
  >
    {children}
  </NavLink>
)

const Menu = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth0()
  return (
    <Nav className="mr-auto" navbar>
      <NavItem>
        <MenuLink to="/" onClick={onNavigate}>
          {labels.Home}
        </MenuLink>
      </NavItem>
      {!isAuthenticated && (
        <NavItem>
          <MenuLink to="/demo" onClick={onNavigate}>
            {labels.Demo}
          </MenuLink>
        </NavItem>
      )}
      {isAuthenticated && (
        <NavItem>
          <MenuLink to="/trend" onClick={onNavigate}>
            {labels.Trend}
          </MenuLink>
        </NavItem>
      )}
    </Nav>
  )
}

const logoutWithRedirect = (logout) => {
  logout({
    returnTo: window.location.origin,
  })
}

const UserInfoDesktop = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  return (
    <Nav className="d-none d-md-block" navbar>
      {!isAuthenticated && (
        <NavItem>
          <Button
            size="lg"
            className="btn-margin"
            onClick={() => loginWithRedirect()}
          >
            {labels.Login}
          </Button>
        </NavItem>
      )}
      {isAuthenticated && (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret id="profileDropDown">
            <img
              src={user.picture}
              alt="Profile"
              className="nav-user-profile rounded-circle"
              width="50"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header className="text-xl">
              {user.name}
            </DropdownItem>
            <DropdownItem
              tag={RouterNavLink}
              to="/profile"
              className="text-xl"
              activeClassName="router-link-exact-active"
            >
              <FontAwesomeIcon icon="user" className="mr-3" />
              {labels.Profile}
            </DropdownItem>
            <DropdownItem
              className="text-xl"
              onClick={() => logoutWithRedirect(logout)}
            >
              <FontAwesomeIcon icon="power-off" className="mr-3" />
              {labels.Logout}
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )}
    </Nav>
  )
}

const UserInfoMobile = ({ onNavigate }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  return (
    <>
      {!isAuthenticated && (
        <Nav className="d-md-none" navbar>
          <NavItem>
            <Button size="lg" onClick={() => loginWithRedirect()}>
              {labels.Login}
            </Button>
          </NavItem>
        </Nav>
      )}
      {isAuthenticated && (
        <Nav className="d-md-none justify-content-between" navbar>
          <NavItem>
            <img
              src={user.picture}
              alt="Profile"
              className="nav-user-profile d-inline-block rounded-circle mr-3"
              width="50"
            />
            {user.name}
          </NavItem>
          <NavItem>
            <MenuLink to="/profile" onClick={onNavigate}>
              <FontAwesomeIcon icon="user" className="mr-3" />
              {labels.Profile}
            </MenuLink>
          </NavItem>
          <NavItem>
            <MenuLink onClick={() => logoutWithRedirect(logout)}>
              <FontAwesomeIcon icon="power-off" className="mr-3" />
              {labels.Logout}
            </MenuLink>
          </NavItem>
        </Nav>
      )}
    </>
  )
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const close = () => isOpen && toggle()
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Menu onNavigate={close} />
          <UserInfoDesktop />
          <UserInfoMobile onNavigate={close} />
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
