import React, {Component} from 'react'
import { Card, Image, Button, Grid, Form, Input, Message } from 'semantic-ui-react'
import Link from 'next/link';
import Quest from '../ethereum/quest';
import web3 from '../ethereum/web3';





// const QuestCardEnigme = (props) => {
    class QuestCardEnigme extends Component {

        state = {
            questPrice : this.props.questPrice,
            loading : false,
            loadingWithdraw: false,
            recipientAddress:'',
            errorMessage: "",
            errorMessageWithdraw:"",
          }

          onSubmit = async (event) => {
            event.preventDefault();
               console.log(this.state.questPrice);
                this.setState({loading: true, errorMessage: ''});
                try {
                    const accounts = await web3.eth.getAccounts();
                    const data = await Quest(this.props.questAddress).methods.getInQuest(
    
                    ).send({from : accounts[0], value: this.state.questPrice});
                    console.log("DATA",data);
                    //Router.push("/");
                    
                } catch (err) {
                    this.setState({ errorMessage: err.message });
                }
                this.setState({ loading: false });
                
    }

    onClick = async () =>{
        this.setState({loadingWithdraw: true, errorMessageWithdraw: ""});
        try {
            const accounts = await web3.eth.getAccounts();
                    const data = await Quest(this.props.questAddress).methods.withdrawBalanceQuest(
                        this.state.recipientAddress
                    )
                    .send({from : accounts[0]});
        } catch (err) {
            this.setState({ errorMessageWithdraw: err.message });
        }
        this.setState({ loadingWithdraw: false });
    }


    render(props) {



                return (    
                <Card fluid>
                    {console.log(this.props.questPrice)}
                    <Image src={this.props.questPicture ? this.props.questPicture : "https://www.graphicstyle.fr/wp-content/uploads/1500-design-futuriste.jpg"} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{this.props.questTitle}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Contrat : {this.props.questAddress ? this.props.questAddress : ' addresse du contract'}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.questDescription ? this.props.questDescription : "Sans Description"}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Grid>
                            <Grid.Column width={6}>
                                
                                    <p>Enigmes :</p>
                                    {/* <Icon name='user' /> */}
                                    {this.props.enigmesCount ? this.props.enigmesCount : 0} 
                                    {/* / {this.props.questEnigmeCount ? this.props.questEnigmeCount : 0} */}
                                
                            </Grid.Column>
                            
                            <Grid.Column width={5} >
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={6}>
                                            <p>Solde :</p>
                                            {/* <Icon name='user' /> */}
                                            <p>{this.props.questBalance ? web3.utils.fromWei(this.props.questBalance, "ether") : 0} ETH </p>
                                        </Grid.Column>
                                        <Grid.Column width={7}>
                                            
                                            <Form onSubmit={this.onClick} error={!!this.state.errorMessageWithdraw}>
                                            <Input
                                                label="addresse"
                                                labelPosition="right"
                                                value={this.state.recipientAddress}
                                                onChange={(event) => this.setState({recipientAddress: event.target.value})}
                                            />
                                            <Message error header="Erreur lors de l'envoi" content={this.state.errorMessageWithdraw} />
                                                <Button fluid loading={this.state.loadingWithdraw}>Récupérer solde</Button>
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                 
                            </Grid.Column>
                            <Grid.Column width={5} >
                                
                                    <p>Joueurs :</p>
                                    {/* <Icon name='user' /> */}
                                    {this.props.questPlayersCount ? this.props.questPlayersCount : 0} 
                                
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                    <Card.Content extra>
                        <Grid>
                            <Grid.Column width={8}>
                                
                                    <p>Nombre de mauvaise réponses :</p>
                                    {/* <Icon name='user' /> */}
                                    {this.props.questResponseCount ? this.props.questResponseCount : 0}


                                
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Link href={`/play/community/${this.props.questAddress}/new`}>
                                        <a>
                                            {/* <Button primary>Ajouter une Enigme</Button> */}
                                            <Button
                                                floated="right"
                                                content="Ajouter une Enigme"
                                                //icon="add circle"
                                                color="blue"
                                                // fluid
                                                
                                            />
                                        </a>
                                    </Link>
                                    </Grid.Column>
                        </Grid>
                    </Card.Content>
                    <Card.Content extra>
                        <Grid>
                            <Grid.Column width={8}>
                                
                                    <p>Inscription :</p>
                                    {/* <Icon name='user' /> */}
                                    {/* {web3.utils.fromWei(this.props.questPrice, 'ether')} ETH */}
                                {web3.utils.fromWei(this.props.questPrice, "ether")} ETH
                               
                            </Grid.Column>
                            
                            <Grid.Column width={8}>
                                {/* <Link href={`/play/community/${this.props.questAddress}`}>
                                        <a>
                                            <Button
                                                floated="right"
                                                content="S'inscrire"
                                                //icon="add circle"
                                                color="blue"
                                                // fluid
                                                
                                            />
                                        </a>
                                </Link> */}
                                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                    <Form.Field>
                                        <Input
                                            label="ETH"
                                            labelPosition="right"
                                            disabled
                                            value={web3.utils.fromWei(this.state.questPrice, "ether")}
                                            onChange={(event) => this.setState({questPrice: event.target.value})}
                                        />
                                    </Form.Field>
                                    <Message error header="Erreur lors de l'envoi" content={this.state.errorMessage} />
                                    <Button loading={this.state.loading} primary fluid>
                                        S'inscrire 
                                    </Button>
                                </Form>
                            
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>

                );
        };


}

export default QuestCardEnigme;