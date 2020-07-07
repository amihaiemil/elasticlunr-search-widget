import React from "react";
import ReactDOM from "react-dom";

import Search from "./components/Search";
var $ = require('jquery');

var size = $('script[id=elnr-sw-script]').attr('size');
var placeholder = $('script[id=elnr-sw-script]').attr('placeholder');
var theme = $('script[id=elnr-sw-script]').attr('theme');
if(!size) {
  size = 3;
}
if(!placeholder) {
  placeholder = "Enter keywords...";
}
if(index === undefined || index == null) { //The ElasticLunr index has to be present in the Document.
  console.error(
    "elasticlunr-search-widget.min.js: Please specify the ElasticLunr index!"
  );
  console.error("Variable index (ElasticLunr) should be present on the page");
} else {
  if (theme === "dark") {
    $('head').append(
      '<link href="https://www.amihaiemil.com/css/elasticlunr/elasticlunr-search-widget_dark.css" type="text/css" rel="stylesheet"/>'
    )
  } else {
    $('head').append(
      '<link href="https://www.amihaiemil.com/css/elasticlunr/elasticlunr-search-widget_light.css" type="text/css" rel="stylesheet"/>'
    )
  }
  var divId = "elasticlunr-search-widget";
  var searchDiv = document.getElementById(divId);
  if(searchDiv == null) { //if the div doesn't exist, create it.
      searchDiv = document.createElement("div");
      searchDiv.setAttribute("id", divId);
      document.body.appendChild(searchDiv);
  }
  ReactDOM.render(
    <Search placeholder={placeholder} size={size}/>,
    searchDiv
  );
}
