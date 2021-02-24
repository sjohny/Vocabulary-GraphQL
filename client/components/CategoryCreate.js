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
    }).then(() => hashHistory.push('/'))
  }

  render () {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new Category</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Category Title:</label>
          <input
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
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
