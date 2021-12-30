import React, { Component } from 'react';
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import questFactory from '../../../ethereum/questFactory';
import Quest from '../../../ethereum/quest';
import QuestCard from '../../../components/QuestCard';
import { Grid } from 'semantic-ui-react';


////////////////
/////////////Changer methode enregistrement Image vers une solution locale
//////////////

class QuestsIndex extends Component {
   

    static async getInitialProps() {
        const deployedQuestsCommunity = await questFactory.methods.getDeployedQuestsCommunity().call();

            const data = await Promise.all(deployedQuestsCommunity.map(async (address) => {
                let arrayQuestData = [];
                const quest = Quest(address);
                const datas = await quest.methods.getQuestSummary().call();
                arrayQuestData.push([datas[0], datas[1], datas[2], datas[3], datas[4], datas[5], datas[6], datas[7] ])
                
                return arrayQuestData;
            })).catch(err => console.log(err))     
            // const data = [];     
        
            return { deployedQuestsCommunity, Data : data};
        }

     render() {
        const Datas = this.props.Data;
        console.log(this.props.Data[0][0]);
        return (
            <Layout>
                <h3>Quests de la Communauté</h3>
                
                <Grid >
                    <Grid.Row>

                    {/* {console.log(this.props.Data)} */}
                    {
                        
                        Datas.map((truc, index) => {
                            //  console.log("Address contract : ", truc[1]);
                            return (
                                    <Grid.Column key={index} width={7}  style={{margin:'0.5rem'}}>
                                        <QuestCard  
                                            questAddress={this.props.deployedQuestsCommunity[index]} 
                                            questTitle={truc[0][1]} 
                                            questPrice={web3.utils.fromWei(truc[0][4], "ether")} 
                                            questDescription={truc[0][2]} 
                                            questPicture={truc[3]}
                                            
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