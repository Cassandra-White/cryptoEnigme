import React, { Component } from "react";
import { Card, Button, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import questFactory from "../ethereum/questFactory";
import Link from "next/link";

class HomeIndex extends Component {
  static async getInitialProps() {
    const questsOfficial = await questFactory.methods
      .getDeployedQuestsOfficial()
      .call();
    const questsCommunity = await questFactory.methods
      .getDeployedQuestsCommunity()
      .call();
    return { questsOfficial, questsCommunity };
  }

  renderOffcial() {
    const description = [
      "Découvrez et Jouer aux énigme officielles.",
      "Mettez vous au défie et Remportez de Jackpot !",
    ].join(" ");
    const CardExampleExtraContent = () => (
      <Card>
        <Card.Content header="Quête Officielle" textAlign="center" />
        <Card.Content description={description} />
        <Link href="/play/official/quests">
          <a>
            <Button
              content="Jouer !"
              color="red"
              fluid
            />
          </a>
        </Link>

        <Card.Content extra>
          {this.props.questsOfficial.length} quêtes trouvée
        </Card.Content>
      </Card>
    );

    return <CardExampleExtraContent />;
  }

  renderCommunity() {
    const description = [
      "Jouer aux créations de la communauté.",
      "Attention les plus fourbes sont ici !",
    ].join(" ");
    const CardExampleExtraContent = () => (
      <Card>
        <Card.Content header="La Communauté" textAlign="center" />
        <Card.Content description={description} />
        <Link href="/play/community/quests">
          <a>
            <Button
              content="Jouer !"
              primary
              fluid
            />
          </a>
        </Link>
        <Card.Content extra>
          {this.props.questsCommunity.length} Quêtes trouvée
        </Card.Content>
      </Card>
    );

    return <CardExampleExtraContent />;
  }

  render() {
    return (
      <Layout>
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6} floated="right">
                {this.renderOffcial()}
              </Grid.Column>
              <Grid.Column width={6} floated="left">
                {this.renderCommunity()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default HomeIndex;
