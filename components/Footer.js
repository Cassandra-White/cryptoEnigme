import React from "react";
import { Grid, Segment, Container, List, Header } from "semantic-ui-react";
//import { Link } from "../routes";

const Footer = () => {
  return (
   
    <Segment  vertical  style={{ padding: "5em 0em", background: "#F8F8F8", marginTop:"2rem" }}>
    <Container className="ui center  container" >
      <Grid divided  stackable className="ui centered grid" >
        <Grid.Row>
          <Grid.Column width={3}  className="center  column">
            <Header  as="h4" content="About" />
            <List link >
              <List.Item as="a">Sitemap</List.Item>
              <List.Item as="a">Contact Us</List.Item>
              <List.Item as="a">Religious Ceremonies</List.Item>
              <List.Item as="a">Gazebo Plans</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header  as="h4" content="Services" />
            <List link >
              <List.Item as="a">Banana Pre-Order</List.Item>
              <List.Item as="a">DNA FAQ</List.Item>
              <List.Item as="a">How To Access</List.Item>
              <List.Item as="a">Favorite X-Men</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" >
              Footer Header
            </Header>
            <p>
              Extra space for a call to action inside the footer that could
              help re-engage users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
  );
};

export default Footer;