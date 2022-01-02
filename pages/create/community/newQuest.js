import React, { Component } from "react";
import { Form, Button, Input, Message, Grid } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import questFactory from "../../../ethereum/questFactory";
import web3 from "../../../ethereum/web3";
import QuestCardTemplate from '../../../components/QuestCardTemplate';
import { useRouter } from 'next/router'
import Router from 'next/router';
import Link from "next/link";



class QuestOfficialNew extends Component {
    
     state = {
        questTitle:"" ,
        questPrice: 0,
        questDescription:"",
        questPicture:"",
        loading : false,
        errorMessage: "",

     }

     onSubmit = async (event) => {

            event.preventDefault();
            this.setState({loading: true, errorMessage: ''});
            try {
                const accounts = await web3.eth.getAccounts();
                const data = await questFactory.methods.createQuestCommunity(
                    this.state.questTitle,
                    web3.utils.toWei(this.state.questPrice, "ether"),
                    this.state.questDescription,
                    this.state.questPicture,
                )
                .send({from : accounts[0]});
                console.log(data);
                Router.push("/");
                
            } catch (err) {
                this.setState({ errorMessage: err.message });
            }
            this.setState({ loading: false });
            
            
     };




    render(){
        
        return (
            <Layout>
                 <Link href={`/`}>
                    <a>/Retour  </a>
                </Link>
                <h3>Créer une quête pour la communauté</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label>Etape 1 : Créer votre Nouvelle Quête</label>
                                <Input
                                    label="Titre de votre quête"
                                    labelPosition="left"
                                    value={this.state.questTitle}
                                    onChange={(event) => this.setState({questTitle: event.target.value})}
                                />

                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Image Quête"
                                    labelPosition="left"
                                    value={this.state.questPicture}
                                    onChange={(event) => this.setState({questPicture: event.target.value})}
                                />      
                                
                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Description Quête"
                                    labelPosition="left"
                                    value={this.state.questDescription}
                                    onChange={(event) => this.setState({questDescription: event.target.value})}
                                />

                                <Input
                                    style={{marginTop:'0.5rem'}}
                                    label="Prix d'inscription"
                                    labelPosition="left"
                                    value={this.state.questPrice}
                                    onChange={(event) => this.setState({questPrice: event.target.value})}
                                />
                            </Form.Field>
                            <Message error header="Erreur lors de l'envoi" content={this.state.errorMessage} />
                            <Button loading={this.state.loading} primary>
                                Créer
                            </Button>
                        </Form>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <QuestCardTemplate questTitle ={this.state.questTitle} questPrice={this.state.questPrice} questDescription={this.state.questDescription} questPicture={this.state.questPicture}/>
                        
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
               
            </Layout>
        )
    }
}

export default QuestOfficialNew;