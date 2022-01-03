import React from "react";
import { Card, Image, Button, Grid } from "semantic-ui-react";

const QuestCard = (props) => (
  <Card>
    <Image
      src={
        props.questPicture
          ? props.questPicture
          : "http://gallery.tranchesdunet.com/galerie-sf-villes/1920x1080-Dizorb-CityScape-HD-Wallpaper.jpg"
      }
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>{props.questTitle}</Card.Header>
      <Card.Meta>
        <span className="date">
          Contrat : {props.manager ? props.manager : " addresse du contract"}
        </span>
      </Card.Meta>
      <Card.Description>
        {props.questDescription ? props.questDescription : "Sans Description"}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Grid>
        <Grid.Column width={6}>
          <a>
            <p>Enigmes :</p>
            {/* <Icon name='user' /> */}
            {props.questEnigmeCompleted ? props.questEnigmeCompleted : 0} /{" "}
            {props.questEnigmeCount ? props.questEnigmeCount : 0}
          </a>
        </Grid.Column>

        <Grid.Column width={5}>
          <a>
            <p>Solde :</p>
            {/* <Icon name='user' /> */}
            {props.questBalance ? props.questBalance : 0} ETH
          </a>
        </Grid.Column>
        <Grid.Column width={5}>
          <a>
            <p>Joueurs :</p>
            {/* <Icon name='user' /> */}
            {props.questPlayer ? props.questPlayer : 0}
          </a>
        </Grid.Column>
      </Grid>
    </Card.Content>
    <Card.Content extra>
      <Grid>
        <Grid.Column width={16}>
          <a>
            <p>Nombre de mauvaise réponses :</p>
            {/* <Icon name='user' /> */}
            {props.questResponseCount ? props.questResponseCount : 0}
          </a>
        </Grid.Column>
      </Grid>
    </Card.Content>
    <Card.Content extra>
      <Grid>
        <Grid.Column width={8}>
          <a>
            <p>Inscription :</p>
            {/* <Icon name='user' /> */}
            {/* {web3.utils.fromWei(props.questPrice, 'ether')} ETH */}
            {props.questPrice} ETH
          </a>
        </Grid.Column>

        <Grid.Column width={8}>
          <a>
            <Button
              floated="right"
              content="Jouer !"
              //icon="add circle"
              color="red"
              // fluid
            />
          </a>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

export default QuestCard;
