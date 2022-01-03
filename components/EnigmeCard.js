import React from "react";
import { Card, Button, Grid } from "semantic-ui-react";
import Link from "next/link";

const EnigmeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header>{props.enigmeTitle}</Card.Header>
      <Card.Description>
        {props.enigmeContent ? props.enigmeContent : "Sans Description"}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Grid>
        <Grid.Column width={16}>
          <p>
            Tentatives :{" "}
            {props.enigmeResponseCount ? props.enigmeResponseCount : 0}
          </p>
        </Grid.Column>
      </Grid>
    </Card.Content>
    <Card.Content extra>
      <Grid>
        <Grid.Column>
          <Link
            href={`/play/community/${props.questAddress}/${props.enigmeIndex}`}
          >
            <a>
              <Button
                content="Essayer"
                color="blue"
                fluid
              />
            </a>
          </Link>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

export default EnigmeCard;
