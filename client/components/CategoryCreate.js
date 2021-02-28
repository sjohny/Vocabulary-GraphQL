import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchCategories';

class CategoryCreate extends Component {
  constructor(props){
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event){
    event.preventDefault();

    this.props.mutate({
      variables: {title: this.state.title},
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/dashboard'))
  }

  render () {
    return (
      <div className="row">
        <Link to="/dashboard">Back</Link>
        <h5>Create a new Category</h5>
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Category title"
              onChange={event => this.setState({title: event.target.value})}
              value={this.state.title}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddCategory($title: String){
    addCategory(title: $title){
      title
    }
  }
`;

export default graphql(mutation)(CategoryCreate);
