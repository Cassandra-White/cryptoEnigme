import React, {Component} from 'react';
import { Button, Card, Feed, Form, Grid, Image, Input, Message } from 'semantic-ui-react';
import Layout from "../../../../../components/Layout";
import Quest from '../../../../../ethereum/quest';
import PlayersResponsesCard from '../../../../../components/PlayersResponsesCard';
import web3 from '../../../../../ethereum/web3';
class EnigmeIndex extends Component {
  static async getInitialProps(props) {
    // console.log(props);
    
    const questAddress  = props.query.enigmes;
    const enigmeIndex = props.query.enigme;
    console.log('questAddress =', questAddress);
    console.log('enigmeIndex =', enigmeIndex);
    const quest = Quest(questAddress);
    const enigmePlayersResponses = await quest.methods.getEnigmePlayersResponses(enigmeIndex).call();
    const enigmeSummary = await quest.methods.getEnigmeSummary(enigmeIndex).call();
    console.log('enigmePlayersResponses =', enigmePlayersResponses);
    // const enigmeCount = await quest.methods.getEnigmeCount().call();
    // const enigmes = await Promise.all(
    //     Array(parseInt(enigmeCount))
    //       .fill()
    //       .map((element, index) => {
    //         return quest.methods.getEnigmeSummary(index).call();
    //       })
    //   );
    //   console.log(questPrice);
          return { enigmePlayersResponses, enigmeIndex, quest, enigmeSummary, questAddress  }

       
}

state = {
  enigmeIndex : this.props.enigmeIndex,
  responsePlayer : "",
  loading : false,
  errorMessage: "",
}

onSubmit = async (event) => {
        event.preventDefault();
           console.log(this.state.enigmeIndex);
           console.log(this.state.responsePlayer);
            this.setState({loading: true, errorMessage: ''});
            try {
                const accounts = await web3.eth.getAccounts();
                const data = await Quest(this.props.questAddress).methods.tryEnigmePlayerReponse(
                    this.state.enigmeIndex,
                    this.state.responsePlayer

                ).send({from : accounts[0]});
                console.log("DATA",data);
                //Router.push("/");
                
            } catch (err) {
                this.setState({ errorMessage: err.message });
            }
            this.setState({ loading: false });
            
}


    render() {



      return (
        <Layout>
            <h3>Page Répondre à l'enigme</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <p>{this.props.enigmeSummary[0]}</p>
                <p>{this.props.enigmeSummary[1]}</p>
              </Grid.Column>
              <Grid.Column width={8}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label>Votre Réponse :</label>
                                <Input
                                    label="Réponse :"
                                    labelPosition="left"
                                    value={this.state.responsePlayer}
                                    onChange={(event) => this.setState({responsePlayer: event.target.value})}
                                />
                            </Form.Field>
                            <Message error header="Erreur lors de l'envoi" content={this.state.errorMessage} />
                            <Button loading={this.state.loading} primary fluid>
                                Essayer
                            </Button>
                        </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <p> {this.props.enigmePlayersResponses.length} Réponses précédente </p>
                {this.props.enigmePlayersResponses.map((response, index) => {
                  return (
                   <PlayersResponsesCard key={index} responseIndex={index} response={response}/> 
                    )
                 })} 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
      );
    }
  }
  
  export default EnigmeIndex;
  