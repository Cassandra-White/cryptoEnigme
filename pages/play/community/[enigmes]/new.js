import React, { Component } from 'react';
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";
// import questFactory from '../../../ethereum/questFactory';
import Quest from '../../../../ethereum/quest';
// import QuestCard from '../../../components/QuestCard';
import { Form, Button, Input, Message, Grid } from "semantic-ui-react";
import Link from 'next/link';
import Router from 'next/router';



class EnigmesIndexNew extends Component {

    static async getInitialProps(props) {
        // console.log(props);
        const address  = props.query.enigmes;
        // console.log(address);
        
        const quest = Quest(address);
        
              return { address, quest }
    }
   
    // titleEnigme
    // contentEnigme
    // reponseEnigme
    // clueEnigme1
    // clueEnigme2
    // clueEnigme3
    state = {
        titleEnigme:"" ,
        contentEnigme: "",
        reponseEnigme:"",
        clueEnigme1:"",
        clueEnigme2:"",
        clueEnigme3:"",
        loading : false,
        errorMessage: "",

     }

     

     onSubmit = async (event) => {
            
            event.preventDefault();
           
            this.setState({loading: true, errorMessage: ''});
            try {
                
                const accounts = await web3.eth.getAccounts();
                const data = await Quest(this.props.address).methods.createEnigme(
                    this.state.titleEnigme,
                    this.state.contentEnigme,
                    this.state.reponseEnigme,
                    this.state.clueEnigme1,
                    this.state.clueEnigme2,
                    this.state.clueEnigme3,
                    
                )
                .send({from : accounts[0]});
                console.log(data);
                Router.push("/play/community/0x0D9F2f54d317B6dd567bE7A80B93642dc2F242c5");
                
            } catch (err) {
                this.setState({ errorMessage: err.message });
            }
            this.setState({ loading: false });
            
            
     };




    render(){
        
        return (
            <Layout>
                 <Link href={`/play/community/${this.props.address}`}>
                    <a>/Retour  </a>
                </Link>
                <h3>Créer une quête pour la communauté</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label>Créez votre Nouvelle Enigme</label>
                                <Input
                                    label="Titre de votre enigme"
                                    labelPosition="left"
                                    value={this.state.titleEnigme}
                                    onChange={(event) => this.setState({titleEnigme: event.target.value})}
                                />

                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Contenu de l'enigme"
                                    labelPosition="left"
                                    value={this.state.contentEnigme}
                                    onChange={(event) => this.setState({contentEnigme: event.target.value})}
                                />      
                                
                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Réponse de l'enigme"
                                    labelPosition="left"
                                    value={this.state.reponseEnigme}
                                    onChange={(event) => this.setState({reponseEnigme: event.target.value})}
                                />

                                <Input
                                    label="Indice 1"
                                    labelPosition="left"
                                    value={this.state.clueEnigme1}
                                    onChange={(event) => this.setState({clueEnigme1: event.target.value})}
                                />

                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Indice 2"
                                    labelPosition="left"
                                    value={this.state.clueEnigme2}
                                    onChange={(event) => this.setState({clueEnigme2: event.target.value})}
                                />      
                                
                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Indice 3"
                                    labelPosition="left"
                                    value={this.state.clueEnigme3}
                                    onChange={(event) => this.setState({clueEnigme3: event.target.value})}
                                />
                                
                            </Form.Field>
                            <Message error header="Erreur lors de l'envoi" content={this.state.errorMessage} />
                            <Button loading={this.state.loading} primary>
                                Créer
                            </Button>
                        </Form>

                    </Grid.Column>
                    {/* <Grid.Column width={8}>
                        <QuestCardTemplate questTitle ={this.state.questTitle} questPrice={this.state.questPrice} questDescription={this.state.questDescription} questPicture={this.state.questPicture}/>
                        
                    </Grid.Column> */}
                    </Grid.Row>
                </Grid>
               
            </Layout>
        )
    }
}



export default EnigmesIndexNew;


// 0 manager,
// 1 questTitle,
// 2 questDescription,
// 3 questPicture,
// 4 questPrice,
// 5 playersCount,
// 6 questResponseCount,
// 7 questCompleted