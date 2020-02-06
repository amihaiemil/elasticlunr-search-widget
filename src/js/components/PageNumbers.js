import React from "react";

import PageNumber from "./PageNumber";

/**
 * Component for the list of page numbers that appreast at the bottom of
 * the search results.
 */
export default class PageNumbers extends React.Component {
  /**
   * State of this search component.
   */
  constructor() {
    super();
    this.state = {
      selectedPage: 0
    };
  }

  /**
   * Handle the event when the user clicks on a page number.
   */
  selectPage(number) {
    this.setState(
      {
        selectedPage: number
      }
    );
    this.props.getSearchResults(this.props.results.pages[number], false);
  }


  render() {
    var links = this.props.results.pages;
    var pagesList = []
    if(links) {
      if (this.props.results.previousPage != '-') {
        pagesList.push(
          <PageNumber
            selectPage={this.selectPage.bind(this)}
            id={"search-page-previous"}
            key={"search-page-previous"}
            link={this.props.results.previousPage}
            value={this.state.selectedPage-1}
            label='<'
            selected = {false}
          />
        );
      }
      for (var i = 0; i < links.length; i++) {
        pagesList.push(
          <PageNumber
            selectPage={this.selectPage.bind(this)}
            id={"search-page-" + i}
            key={"search-page-" + i}
            link={links[i]}
            value={i}
            label={i+1}
            selected = {i==this.state.selectedPage}
          />
        );
      }
      if (this.props.results.nextPage != '-') {
        pagesList.push(
          <PageNumber
            selectPage={this.selectPage.bind(this)}
            id={"search-page-next"}
            key={"search-page-next"}
            link={this.props.results.nextPage}
            value={this.state.selectedPage+1}
            label='>'
            selected = {false}
          />
        );
      }
    }
    return (
      pagesList.length > 0 ?
          <ul className={"search-pages"} id="pages">
              {
                pagesList.map(
                  function(page){
                   return page;
                  }
                )
              }
          </ul> : null
    );
  }
}
