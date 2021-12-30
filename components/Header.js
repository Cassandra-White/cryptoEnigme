import React, { useEffect } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from 'next/link';
//import { Link } from "../routes";





const Header = (props) => {
 

    // const popo = async () => {
    //     try {

    //         accounts = await web3.eth.getAccounts();
    //         return accounts;
    //     } catch(err) {
    //         console.log(err);
    //     }
    // };

    // console.log(popo());

  return (
            <Menu
              size="large"
              style={{margin:"0.5rem", marginBottom:"3rem"}}
            >
              <Link href="/">
                    <Menu.Item as="a" active>
                        CryptoEnigme
                    </Menu.Item>
                </Link>

                <Menu.Menu position="right">
                    <Menu.Item as="a">News</Menu.Item>
                    <Menu.Item as="a">Informations</Menu.Item>
                    <Menu.Item >
                    {/* {
                        props.accounts.length == 0 ? (<> NOTHING</>
                        ) : (
                            props.accounts[0] == '0x6c9E8C257eB8f47F9808A5804Ec0Cd1C43EE0181' ? (
                             <Link href="/create/official/newQuest">
                                    <a>
                                        <Button
                                            
                                            //content=""
                                            icon="add circle"
                                            color="red"
                                            fluid
                                            // style={{marginLeft:"0.3rem"}}
                                            
                                        />
                                    </a>
                                </Link>
                            ) : (<></>)
                        )
                    } */}

                    <Link href="/create/official/newQuest">
                        <a>
                            <Button
                                
                                //content=""
                                icon="add circle"
                                color="red"
                                fluid
                                // style={{marginLeft:"0.3rem"}}
                                
                            />
                        </a>
                    </Link>
                    

                    <Link href="/create/community/newQuest">
                        <a>
                            <Button
                                
                                //content=""
                                icon="add circle"
                                primary
                                fluid
                                style={{marginLeft:"0.5rem"}}
                                
                            />
                        </a>
                    </Link>
                    </Menu.Item>

                </Menu.Menu>
            </Menu>
     

  );
};

export default Header;