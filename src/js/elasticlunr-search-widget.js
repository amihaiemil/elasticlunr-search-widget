import React from "react";
import ReactDOM from "react-dom";

import Search from "./components/Search";
var $ = require('jquery');

var index = $('script[id=elnr-sw-script]').attr('index');
var size = $('script[id=elnr-sw-script]').attr('size');
var placeholder = $('script[id=elnr-sw-script]').attr('placeholder');
if(!size) {
  size = 3;
}
if(!placeholder) {
  placeholder = "Enter keywords...";
}
if(index) {
  $('head').append(
    '<link href="https://www.amihaiemil.com/css/elasticlunr/elasticlunr-search-widget.css" type="text/css" rel="stylesheet"/>'
  )
  var divId = "elasticlunr-search-widget";
  var searchDiv = document.getElementById(divId);
  if(searchDiv == null) { //if the div doesn't exist, create it.
      searchDiv = document.createElement("div");
      searchDiv.setAttribute("id", divId);
      document.body.appendChild(searchDiv);
  }
  ReactDOM.render(
    <Search index={index} placeholder={placeholder}/>,
    searchDiv
  );
} else {
  console.error(
    "elasticlunr-search-widget.min.js: Please specify the ElasticLunr index!"
  );
}
