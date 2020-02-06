import React from "react";

import Input from "./Input";
import Results from "./Results";

var $ = require('jquery');

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
      searchResults: {}
    };
  }

  /**
   * Make an ajax call to get the search results json object from the backend.
   * @param query - String; Search query.
   * @param prependUrl - Boolean; Should the searchUrl be prepended or not?
   */
  getSearchResults(query, prependUrl) {
    if(query.length >= 3) {
      $.support.cors = true;
      $.ajax({
		    type : "GET",
		    url : prependUrl ? this.props.searchUrl + query : query,
		    headers : {
		  	  Accept : "application/json; charset=utf-8"
		    },
		    success : function(results, status) {
			    if(status == "success") {
            this.setState(
              {
                searchResults: results
              }
            );
			    } else {
            console.log("STATUS NOT SUCCESS!");
			    }
		    }.bind(this),
		    statusCode: {
			    404: function() {
            console.log("404 STATUS CODE");
			    },
			    500: function() {
            console.log("500 STATUS CODE");
			    }
		    },
		    error : function(e) {
          console.log("ERROR STATUS CODE");
		    }.bind(this)
    	});
    } else {
       this.setState(
         {
           searchResults: {}
         }
       );
    }
  }

  render() {
    return (
      <div>
        <Input
          placeholder={this.props.placeholder}
          searchUrl={this.props.searchUrl}
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
