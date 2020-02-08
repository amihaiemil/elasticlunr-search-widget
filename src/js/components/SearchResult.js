import React from "react";
/**
 * Panel with autocomplete suggestions that should appear right under
 * the input field as soon as the user types in a few letters.
 */
export default class SearchResult extends React.Component {

  render() {
    return (
      <div className={"search-result"} id={this.props.id} key={this.props.key}>
        <a href={this.props.link}>
            <h3>{this.props.title}</h3>
        </a>
        <div
          className="search-result-text"
          dangerouslySetInnerHTML={
            { __html: this.props.text}
          }></div>
      </div>
    );
  }
}
