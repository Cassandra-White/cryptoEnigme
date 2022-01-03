import React, { Component } from "react";
import Layout from "../../../components/Layout";
import questFactory from "../../../ethereum/questFactory";
import QuestCard from "../../../components/QuestCard";

class QuestIndex extends Component {
  static async getInitialProps() {
    const questsOfficial = await questFactory.methods
      .getDeployedQuestsOfficial()
      .call();

    return { questsOfficial };
  }

  renderQuestCard() {
    this.props.questsOfficial.map(async (enigme) => {
      const enigmeSummary = await enigme.methods.getEnigmeSummary().call();
      return <QuestCard enigmeSummary={enigmeSummary} />;
    });
  }

  render() {
    return (
      <Layout>
        <h3>Page des Quests Officielle</h3>
        {this.renderQuestCard()}
      </Layout>
    );
  }
}

export default QuestIndex;
