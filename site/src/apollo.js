import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri:  "https://workparty.herokuapp.com/graphql"
  }),
});


export var joinBeta = (email) => {
  return client.mutate({
    mutation: gql`
        mutation joinBeta($email: String!) {
            joinBeta(email:$email)
        }
    `,
    variables: {
      email
    }
  });
};