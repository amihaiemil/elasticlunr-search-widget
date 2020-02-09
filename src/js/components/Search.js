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

  buildPagesMatrix(results) {
    var pages = [];
    var page = -1;

    for (i = 0; i < results.length; i++) {
        if (i % this.props.size === 0) {
            pages[++page] = [];
        }

        pages[page].push(results[i]);
    }

    return pages;
  }

  /**
   * Search the ElasticLunr index.
   * @param query - String; Search query.
   */
  getSearchResults(query) {
    if(query.length >= 3) {
	    var res = index.search(
	      query,
		    {
          fields: {
            title: {boost: 2, expand: true},
            preview: {boost: 1, expand: true}
          }
		    }
	    );

	    //As the user types, search is performed at each key stroke and
	    //searchResults is filled with results. If, at the next key-stroke, there
	    //are no results, we should not override the previously found results.
	    if(res.length == 0 && this.props.searchResults.length > 0) {
        return;
	    } else {
        var pageSize = this.props.size;
		    this.setState(
            {
              searchResults: (function () {
                var pages = [];
                var page = -1;

                for (var i = 0; i < res.length; i++) {
                    if (i % pageSize === 0) {
                        pages[++page] = [];
                    }

                    pages[page].push(res[i]);
                }

                return pages;
              })()
            }
          );
	    }
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
