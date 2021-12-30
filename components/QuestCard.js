import React from 'react'
import { Card, Image, Button, Grid } from 'semantic-ui-react'
import Link from 'next/link';


const QuestCard = (props) => (
    
  <Card>
    
    <Image src={props.questPicture ? props.questPicture : "https://www.graphicstyle.fr/wp-content/uploads/1500-design-futuriste.jpg"} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.questTitle}</Card.Header>
      <Card.Meta>
        <span className='date'>Contrat : {props.questAddress ? props.questAddress : ' addresse du contract'}</span>
      </Card.Meta>
      <Card.Description>
        {props.questDescription ? props.questDescription : "Sans Description"}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Grid>
            <Grid.Column width={6}>
                
                    <p>Enigmes :</p>
                    {/* <Icon name='user' /> */}
                    {props.questEnigmeCompleted ? props.questEnigmeCompleted : 0} / {props.questEnigmeCount ? props.questEnigmeCount : 0}
                
            </Grid.Column>
            
            <Grid.Column width={5} >
                
                    <p>Solde :</p>
                    {/* <Icon name='user' /> */}
                    {props.questBalance ? props.questBalance : 0} ETH
                
            </Grid.Column>
            <Grid.Column width={5} >
                
                    <p>Joueurs :</p>
                    {/* <Icon name='user' /> */}
                    {props.questPlayer ? props.questPlayer : 0} 
                
            </Grid.Column>
        </Grid>
    </Card.Content>
    <Card.Content extra>
        <Grid>
            <Grid.Column width={16}>
                
                    <p>Nombre de mauvaise réponses :</p>
                    {/* <Icon name='user' /> */}
                    {props.questResponseCount ? props.questResponseCount : 0}
                
            </Grid.Column>
        </Grid>
    </Card.Content>
    <Card.Content extra>
        <Grid>
            <Grid.Column width={8}>
                
                    <p>Inscription :</p>
                    {/* <Icon name='user' /> */}
                    {/* {web3.utils.fromWei(props.questPrice, 'ether')} ETH */}
                {props.questPrice} ETH
                
            </Grid.Column>
            
            <Grid.Column width={8}>
                <Link href={`/play/community/${props.questAddress}`}>
                        <a>
                            <Button
                                floated="right"
                                content="Jouer !"
                                //icon="add circle"
                                color="blue"
                                // fluid
                                
                            />
                        </a>
                </Link>
            </Grid.Column>
        </Grid>
    </Card.Content>
  </Card>
)

export default QuestCard;