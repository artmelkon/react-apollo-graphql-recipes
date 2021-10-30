import React from 'react';
import { withRouter} from 'react-router-dom';
import { ApolloConsumer } from "@apollo/client";

import CustomButton from '../CustomButton/CustomButton.component';

const handleSignout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/signin')
}

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      // console.log("logout client ", client);
      return (
        <CustomButton onClick={() => handleSignout(client, history)}>
          Sing Out
        </CustomButton>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);
