import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class TranslationCreate extends Component {
  constructor(props){
    super(props);

    this.state = {english: '', svenska: ''};
    this.handleSubmit = this.handleSubmit.bind(this);

  }

   handleSubmit(event) {
     event.preventDefault();
     this.props.mutate({
       variables: {
         english: this.state.english,
         svenska: this.state.svenska,
         categoryId: this.props.categoryId
       }
     }).then(() => this.setState({english: '', svenska: ''}));
   }

  render(){
    return(
      <div>
        <label>Add Translations</label>
        <form onSubmit={this.handleSubmit}>
          <label>
            English:
            <input
              name="english"
              type="input"
              value={this.state.english}
              onChange={event => this.setState({english: event.target.value})} />
          </label>
          <label>
            Svenska:
            <input
              name="svenska"
              type="input"
              value={this.state.svenska}
              onChange={event => this.setState({svenska: event.target.value})} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddWordToCategory($english: String, $svenska: String, $categoryId: ID){
    addWordToCategory(english: $english, svenska: $svenska, categoryId: $categoryId){
      id
      words{
        id
        english
        svenska
        likes
      }
    }
  }
`;

export default graphql(mutation)(TranslationCreate);
