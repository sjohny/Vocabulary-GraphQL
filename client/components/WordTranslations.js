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
        <Link to="/">Back</Link>
        <h3> Words and Translations</h3>
        <h4>{category.title}</h4>
        <TranslationList words={category.words}/>
        <TranslationCreate categoryId={this.props.params.id}/>
      </div>
    );
  }
}

export default graphql(fetchCategory, {
  options: (props) => {return { variables: {id: props.params.id}}}
})(WordTranslations);
