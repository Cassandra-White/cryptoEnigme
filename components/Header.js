import React from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";

const Header = (props) => {
  return (
    <Menu size="large" style={{ margin: "0.5rem", marginBottom: "3rem" }}>
      <Link href="/">
        <Menu.Item as="a" active>
          CryptoEnigme
        </Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Menu.Item as="a">News</Menu.Item>
        <Menu.Item as="a">Informations</Menu.Item>
        <Menu.Item>
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
                style={{ marginLeft: "0.5rem" }}
              />
            </a>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
