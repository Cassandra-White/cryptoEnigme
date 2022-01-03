import React, { Component } from "react";
import Layout from "../../../../components/Layout";
import Quest from "../../../../ethereum/quest";
import QuestCardEnigme from "../../../../components/QuestCardEnigme";
import EnigmeCard from "../../../../components/EnigmeCard";
import { Grid } from "semantic-ui-react";
import Link from "next/link";

class EnigmesIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.enigmes;
    const quest = Quest(address);
    const enigmeCount = await quest.methods.getEnigmeCount().call();
    const questSummary = await quest.methods.getQuestSummary().call();
    const questBalance = await quest.methods.getQuestBalance().call();
    const enigmes = await Promise.all(
      Array(parseInt(enigmeCount))
        .fill()
        .map((element, index) => {
          return quest.methods.getEnigmeSummary(index).call();
        })
    );
    return { enigmes, address, questSummary, questBalance };
  }

  render() {
    return (
      <Layout>
        <Link href={`/play/community/quests`}>
          <a>/Retour </a>
        </Link>
        <QuestCardEnigme
          questAddress={this.props.address}
          questDescription={this.props.questSummary[2]}
          enigmesCount={this.props.enigmes.length}
          questPrice={this.props.questSummary[4]}
          questResponseCount={this.props.questSummary[6]}
          questPlayersCount={this.props.questSummary[5]}
          questBalance={this.props.questBalance}
        />
        les Enigmes :
        <Grid>
          <Grid.Row>
            {this.props.enigmes.map((enigme, index) => {
              return (
                <Grid.Column key={index} width={5}>
                  <EnigmeCard
                    questAddress={this.props.address}
                    enigmeIndex={index}
                    enigmeTitle={enigme[0]}
                    enigmeContent={enigme[1]}
                    enigmeResponseCount={enigme[3]}
                  />
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default EnigmesIndex;

// 0 manager,
// 1 questTitle,
// 2 questDescription,
// 3 questPicture,
// 4 questPrice,
// 5 playersCount,
// 6 questResponseCount,
// 7 questCompleted

// enigmeTitle,
// enigmeContent,
// enigmeResponse,
// enigmeResponseCount,
// enigmeComplete
