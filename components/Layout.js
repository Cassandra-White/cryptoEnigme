import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Container} from "semantic-ui-react";
import Header from "./Header";
import Footer from "./Footer";



const Layout = (props) => {
  
  return (
    
    <div>
        <Header />

            <Container className="ui center  container">
                {props.children}
            </Container>

        <Footer/>
    </div>
  );
};
export default Layout;