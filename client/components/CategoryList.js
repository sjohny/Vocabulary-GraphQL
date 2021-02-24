import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchCategories';

class CategoryList extends Component{
  onCategoryDelete(id){
    this.props.mutate({variables: {id}})
      .then(() => this.props.data.refetch());
  }

  renderCategories(){
    return this.props.data.categories.map(({id, title}) =>{
      return (
        <li key={id} className="collection-item">
          <Link to={`/categories/${id}`}>
            {title}
          </Link>
          <i className="material-icons"
            onClick={() => this.onCategoryDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) { return <div> Loading... </div>;}
    return (
      <div>
        <ul className="collection">
          {this.renderCategories()}
        </ul>
        <Link
          to="/categories/new"
          className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteCategory($id: ID){
    deleteCategory(id: $id){
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(CategoryList)
);
