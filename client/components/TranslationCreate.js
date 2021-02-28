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
        <h6>Add Translations</h6>
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s6">
            <div className="input-field">
              <input
                placeholder="English"
                value={this.state.english}
                onChange={e => this.setState({ english: e.target.value })} />
            </div>
            <div className="input-field">
              <input
                placeholder="Swedish"
                value={this.state.svenska}
                onChange={e => this.setState({ svenska: e.target.value })} />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
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
