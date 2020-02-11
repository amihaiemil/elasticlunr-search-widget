## elasticlunr-search-widget

[![DevOps By Rultor.com](http://www.rultor.com/b/amihaiemil/elasticlunr-search-widget)](http://www.rultor.com/p/amihaiemil/elasticlunr-search-widget)
[![Build Status](https://travis-ci.org/amihaiemil/elasticlunr-search-widget.svg?branch=master)](https://travis-ci.org/amihaiemil/elasticlunr-search-widget)

Search Widget for [ElasticLunr.js](http://elasticlunr.com/) (https://github.com/weixsong/elasticlunr.js). 

It will call ``index.search(...)`` as the user types and display the results in a paginated manner.

## How To Use It

Add the following script to your page:

```xml
<script
    type="text/javascript"
    id = "elnr-sw-script"
    size="3"                       <!--Optional, defaults to 3-->
    placeholder="Enter keywords"   <!--Optional, defaults to "Enter keywords..."-->
    src="https://amihaiemil.com/js/elasticlunr/elasticlunr-search-widget.min.js"> <!--Latest ElasticLunr search widget-->
</script>
```

Make sure to add it **after** the ``<script>`` where you are creating the ElasticLunr ``index``. The Index has to be in the variable ``index``, which the widget calls internally. Otherwise, you will get an error.

The script will render the whole widget in a div with id ``elasticlunr-search-widget``. If the div is not present on the page, it will create and place it right after the script tag - you will probably have to write a little CSS to position the div on the page.

If you are having trouble getting it to run, look under [src/test](https://github.com/amihaiemil/elasticlunr-search-widget/tree/master/src/test) to find an ``index.html`` for test. Look inside it to see how ElasticLunr is imported, index is created and finally this Search Widget is imported last.

See a live example of the widget here: https://amihaiemil.com

## Index Format

When you create the ElasticLunr index, as explained [here](http://elasticlunr.com/), make sure to give it the following format:

```javascript
var index = elasticlunr(
    function () {
        this.addField('title');
        this.addField('preview');
        this.addField('content');
        this.addField('link');
        this.addField('date');
        this.setRef('id');
    }
);
```

The format is important because that's how the search results will be returned and handled by the widget. Here is how the Search Results  look (it's a Json Array):

```javascript
[
  0: {
      ref: "4"
      score: 3.4764451146882474
      doc: {
          id: 4
          title: "Polymorphic Input/Output Data"
          link: "https://www.amihaiemil.com/2019/03/31/polymorphic-input-output-data.html"
          preview: "Using polymorphism for input/output data, as an alternative to model classes"
          content: "Lorem Ipsum Content"
          date: "2019-03-31 00:00:00 +0000"
          }
     }
]
```

## Customization

At the moment, the widget takes the following parameter that can offer some customization.

  * **Size** of the page customizable with the "size" parameter -- defaults to 3
  * **Placeholder** of the input field customizable with the "placeholder" parameter -- defaults to "Search as you type..."

## Issues and Feature Requests

Feel free to open an Issues or Feature Requests and we will try to help asap. We also gladly accept Pull Requests. For instance, one of the next steps in the development of this widget is to let the user specify their custom index format and query type.

## Build
After you take down the project, simply go in its root folder and run the following commands

```shell
$ npm install
$ ./node_modules/.bin/webpack
```
