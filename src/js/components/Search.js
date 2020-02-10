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
      searchResults: [],
      selectedPage: 0
    };
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
              //"paginate" the results; put them in a "pages" matrix;
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

  /**
   * Select a page to be displayed.
   * @param selectedPage - Which of the results page should be displayed?
   *  Most of the times this value will be 0 (the first page), but there
   *  are also cases when we need to display another page -- for instance,
   *  if the user types some keywords, then he clicks (focus out) out of the
   *  Search component (we hide the results List), and then he clicks again
   *  on the Input field (focusIn): in this case the search is performed
   *  again, automatically, with the text that is already typed in the field,
   *  so we need to display the page where the user left from.
   */
  selectPage(selectedPage) {
    this.setState(
      {
        selectedPage: selectedPage
      }
    );
  }

  render() {
    return (
      <div>
        <Input
          placeholder={this.props.placeholder}
          getSearchResults={this.getSearchResults.bind(this)}
          selectedPage={this.state.selectedPage}
          selectPage={this.selectPage.bind(this)}
        />
        <Results
          searchResults={this.state.searchResults}
          selectedPage={this.state.selectedPage}
          getSearchResults={this.getSearchResults.bind(this)}
          selectPage={this.selectPage.bind(this)}
        />
      </div>
    );
  }
}
