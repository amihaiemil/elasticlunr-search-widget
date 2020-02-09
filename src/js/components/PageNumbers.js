import React from "react";

import PageNumber from "./PageNumber";

/**
 * Component for the list of page numbers that appreast at the bottom of
 * the search results.
 */
export default class PageNumbers extends React.Component {

  render() {
    var buttonsList = []
    //render only if we have more than 1 page
    if(this.props.searchResults.length > 1) {
      /*
          if we are on the second page or higher,
          display the "previous page" arrow
      */
      if (this.props.selectedPage > 0) {
        buttonsList.push(
          <PageNumber
            selectPage={this.props.selectPage}
            id={"search-page-previous"}
            key={"search-page-previous"}
            value={this.props.selectedPage-1}
            label='<'
            selected = {false}
          />
        );
      }

      //display page numbers/buttons
      for (var i = 0; i < this.props.searchResults.length; i++) {
        buttonsList.push(
          <PageNumber
            selectPage={this.props.selectPage}
            id={"search-page-" + i}
            key={"search-page-" + i}
            value={i}
            label={i+1}
            selected = {i==this.props.selectedPage}
          />
        );
      }

      /*
          if we are not on the last page,
          display the "next page" arrow
      */
      if (this.props.selectedPage < this.props.searchResults.length - 1) {
        buttonsList.push(
          <PageNumber
            selectPage={this.props.selectPage}
            id={"search-page-next"}
            key={"search-page-next"}
            value={this.props.selectedPage+1}
            label='>'
            selected = {false}
          />
        );
      }
    }
    return (
      buttonsList.length > 0 ?
          <ul className={"search-pages"} id="pages">
              {
                buttonsList.map(
                  function(page){
                   return page;
                  }
                )
              }
          </ul> : null
    );
  }
}
