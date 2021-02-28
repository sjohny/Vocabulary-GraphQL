import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link }from 'react-router';
import fetchCategory from '../queries/fetchCategory';
import TranslationCreate from './TranslationCreate';
import TranslationList from './TranslationList'

class WordTranslations extends Component {
  render() {
    const { category } = this.props.data

    if (!category) { return <div>Loading...</div>; }

    return (
      <div>
        <Link to="/dashboard">Back</Link>
        <h6> Associated words and translations</h6>
        <label>{category.title}</label>
        <TranslationList words={category.words}/>
        <TranslationCreate categoryId={this.props.params.id}/>
      </div>
    );
  }
}

export default graphql(fetchCategory, {
  options: (props) => {return { variables: {id: props.params.id}}}
})(WordTranslations);
