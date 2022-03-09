/** @jsxImportSource theme-ui */
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../components/Auth/AuthContext";
import { Header, Footer, Main, Page } from "../components/Layout";
import {Heading} from 'theme-ui'
import SignOutButton from "../components/Auth/SignOutButton"

const Layout = () => {
  const { user } = useContext(AuthContext); // Bring in user data from context
  console.log(`user in nav is`, user);
  return (
    <>
      <Page>
        <Header sx={{display:'flex',justifyContent:'center'}}> <Heading as='h1'>whatNow</Heading>
          {/* <Link to="/">Home</Link> | <Link to="/login">Login</Link> */}
        </Header>
        <Main>
            <Outlet />
        </Main>
        <Footer>Footer <SignOutButton /></Footer>
      </Page>
    </>
  );
};

export default Layout;