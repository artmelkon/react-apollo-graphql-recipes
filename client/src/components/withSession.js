import React from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
  {({ data, loading, refetch}) => {
    // console.log('current user data ', data)
    if(loading) return null;
    return <Component {...props} refetch={refetch} session={data} />
    }}
  </Query>
)

export default withSession;
