import React, { Component } from 'react';
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";
// import questFactory from '../../../ethereum/questFactory';
import Quest from '../../../../ethereum/quest';
import QuestCardEnigme from '../../../../components/QuestCardEnigme';
import EnigmeCard from '../../../../components/EnigmeCard';
import { Button, Grid } from 'semantic-ui-react';
import Link from 'next/link';




class EnigmesIndex extends Component {
   

    static async getInitialProps(props) {
        // console.log(props);
        
        const address  = props.query.enigmes;
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
        //   console.log(questPrice);
              return { enigmes, address, questSummary, questBalance }
    }



     render() {

        console.log(this.props.questSummary);


// console.log(this.props.enigmes)
        return (
            <Layout>
                <QuestCardEnigme 
                    questAddress={this.props.address} 
                    questDescription= {this.props.questSummary[2]}
                    enigmesCount={this.props.enigmes.length}
                    questPrice={this.props.questSummary[4]}
                    questResponseCount={this.props.questSummary[6]}
                    questPlayersCount={this.props.questSummary[5]}
                    questBalance = {this.props.questBalance}
                />

                les Enigmes :
                <Grid>
                    <Grid.Row>
                        
                            {
                                
                                this.props.enigmes.map((enigme, index) =>{
                                    return(
                                        <Grid.Column key={index} width={5}>
                                            <EnigmeCard questAddress={this.props.address} enigmeIndex ={index} enigmeTitle={enigme[0]} enigmeContent={enigme[1]} enigmeResponseCount={enigme[3]} />
                                        </Grid.Column>
                                    )
                                })
                            }
                        
                    </Grid.Row>
                    
                </Grid>
                



                
                {/* <Grid >
                    <Grid.Row>

                    {
                        this.props.Data.map((truc) => {
                            return (
                                    <Grid.Column width={4} >
                                        <QuestCard questTitle={truc[0][1]} questPrice={web3.utils.fromWei(truc[0][4], "ether")} questDescription={truc[0][2]} questPicture={truc[0][3]}/>
                                    </Grid.Column>
                            )
                        })
                    }

                    </Grid.Row>
                </Grid>   */}
                
                
            </Layout>
                
          
        )
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