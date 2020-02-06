import React from "react";

import SearchResult from "./SearchResult";
import PageNumbers from "./PageNumbers";
import ReactOutsideEvent from 'react-outside-event';

var $ = require('jquery');

/**
 * Panel with results that should appear right under
 * the input field as soon as the user types in a few letters.
 */
class Results extends React.Component {

  onOutsideEvent = (event) => {
    if(event.target.id != 'charles-search-field') {
     this.props.getSearchResults("");
    }
  }

  render() {
    var resArray = this.props.searchResults.results;
    var resultsDivs = [];
    if(resArray) {
      for (var i = 0; i < resArray.length; i++) {
        resultsDivs.push(
          <SearchResult
            id={"search-result-" + i}
            key={"search-result-" + i}
            link={resArray[i].link}
            title={resArray[i].title}
            text={resArray[i].highlight}
          />
        );
      }
    }
    return (
      resultsDivs.length > 0 ?
        <div id="resultsPanel" className="resultsPanel">
          <div className="suggestionGroupClass" id="suggestions">
              {
                resultsDivs.map(
                  function(result){
                   return result;
                  }
                )
              }
          </div>
          <PageNumbers
            getSearchResults={this.props.getSearchResults}
            results={this.props.searchResults} id="paginator" key="paginator"
          />
        </div>
          : null
    );
  }
}

export default ReactOutsideEvent(Results, ['click']);
