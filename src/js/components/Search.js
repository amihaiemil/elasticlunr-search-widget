import React from "react";

import Input from "./Input";
import Results from "./Results";

/**
 * Parent component wrapping all the react search box components.
 *
 */
export default class Search extends React.Component {

  /**
   * State of this search component.
   */
  constructor() {
    super();
    this.state = {
      keywords: "",
      searchResults: []
    };
  }

  /**
   * Search the ElasticLunr index.
   * @param query - String; Search query.
   */
  getSearchResults(query) {
    if(query.length >= 3) {
      this.setState(
        {
          searchResults: this.props.index.search(query);
        }
      );
    } else {
       this.setState(
         {
           searchResults: []
         }
       );
    }
  }

  render() {
    return (
      <div>
        <Input
          placeholder={this.props.placeholder}
          getSearchResults={this.getSearchResults.bind(this)}
        />
        <Results
          searchResults={this.state.searchResults}
          getSearchResults={this.getSearchResults.bind(this)}
        />
      </div>
    );
  }
}
