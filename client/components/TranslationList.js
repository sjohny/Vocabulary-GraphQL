import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class TranslationList extends Component{

  onLike(id, likes){
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeWord: {
          id,
          __typename: 'WordType',
          likes: likes + 1
        }
      }
    });
  }

  renderTranslations(){
    return this.props.words.map(({id, english, svenska, likes}) => {
      return(
        <li key={id} className="collection-item">
          {english} - {svenska}
          <div className="vote-box">
          <i
            className="material-icons"
            onClick={() => this.onLike(id, likes)}
          >
            thumb_up
          </i>
          {likes}
          </div>
        </li>
      );
    });
  }
  render(){
    return(
      <ul className="collection">
        {this.renderTranslations()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation likeWord($id: ID){
    likeWord(id: $id){
      id
      likes
    }
  }
`;

export default graphql(mutation)(TranslationList);
