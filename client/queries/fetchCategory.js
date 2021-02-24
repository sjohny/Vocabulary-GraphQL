import gql from 'graphql-tag';

export default gql`
  query CategoryQuery($id: ID!){
      category(id: $id){
        id,
        title,
      	words{
          id
          english
          svenska
          likes
        }
      }
    }
`;
