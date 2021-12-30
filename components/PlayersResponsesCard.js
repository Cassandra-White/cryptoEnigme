import React from 'react'
import { Card, Feed, Grid, Image } from 'semantic-ui-react';
import Link from 'next/link';


const PlayersResponsesCard = (props) => (
    
<Card >
                      <Card.Content>
                        <Feed>
                              <Feed.Event>
                              {/* <Feed.Label image='/images/avatar/small/elliot.jpg' /> */}
                              <Feed.Content>
                                <Feed.Date content={props.responseIndex} />
                                <Feed.Summary>
                                  {props.response}
                                </Feed.Summary>
                              </Feed.Content>
                            </Feed.Event>
                          </Feed>
                        </Card.Content>
                      </Card>
)

export default PlayersResponsesCard;