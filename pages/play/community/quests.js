import React, { Component } from 'react';
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import questFactory from '../../../ethereum/questFactory';
import Quest from '../../../ethereum/quest';
import QuestCard from '../../../components/QuestCard';
import { Grid } from 'semantic-ui-react';
import Link from 'next/link';


////////////////
/////////////Changer methode enregistrement Image vers une solution locale
//////////////

class QuestsIndex extends Component {
   

    static async getInitialProps() {
        const deployedQuestsCommunity = await questFactory.methods.getDeployedQuestsCommunity().call();

            const data = await Promise.all(deployedQuestsCommunity.map(async (address) => {
                let arrayQuestData = [];
                const quest = Quest(address);
                const balance = await quest.methods.getQuestBalance().call();
                const enigmeCount = await quest.methods.getEnigmeCount().call();
                const datas = await quest.methods.getQuestSummary().call();
                arrayQuestData.push([datas[0], datas[1], datas[2], datas[3], datas[4], datas[5], datas[6], datas[7], balance, enigmeCount ])
                
                return arrayQuestData;
            })).catch(err => console.log(err))     
     
        
            return { deployedQuestsCommunity, Data : data};
        }

     render() {
        const Datas = this.props.Data;
        // console.log(this.props.Data[0][0]);
        return (
            <Layout>
                <Link href={`/`}>
                    <a>/Retour  </a>
                </Link>
                <h3>Quests de la Communauté</h3>
                
                <Grid >
                    <Grid.Row>

                    {/* {console.log(this.props.Data)} */}
                    {
                        
                        Datas.map((quest, index) => {
                            //  console.log("Address contract : ", quest[1]);
                            return (
                                    <Grid.Column key={index} width={7}  style={{margin:'0.5rem'}}>
                                        <QuestCard  
                                            questAddress={this.props.deployedQuestsCommunity[index]} 
                                            questTitle={quest[0][1]} 
                                            questPrice={web3.utils.fromWei(quest[0][4], "ether")} 
                                            questDescription={quest[0][2]} 
                                            questPicture={quest[3]}
                                            questPlayersCount={quest[0][5]}
                                            questResponseCount={quest[0][6]}
                                            questBalance={web3.utils.fromWei(quest[0][8], "ether")}
                                            questEnigmeCount={quest[0][9]}

                                            
                                        />
                                        </Grid.Column>
                            )
                        })
                    }

                    </Grid.Row>
                </Grid>  
                
                
            </Layout>
                
          
        )
    }
}



export default QuestsIndex;


// 0 manager,
// 1 questTitle,
// 2 questDescription,
// 3 questPicture,
// 4 questPrice,
// 5 playersCount,
// 6 questResponseCount,
// 7 questCompleted