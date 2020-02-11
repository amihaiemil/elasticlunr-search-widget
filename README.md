## elasticlunr-search-widget

[![DevOps By Rultor.com](http://www.rultor.com/b/amihaiemil/elasticlunr-search-widget)](http://www.rultor.com/p/amihaiemil/elasticlunr-search-widget)
[![Build Status](https://travis-ci.org/amihaiemil/elasticlunr-search-widget.svg?branch=master)](https://travis-ci.org/amihaiemil/elasticlunr-search-widget)

Search Widget for [ElasticLunr.js](http://elasticlunr.com/) (https://github.com/weixsong/elasticlunr.js). 

It will call ``index.search(...)`` as the user types and display the results in a paginated manner.

# How To Use It

Add the following script to your page:

```xml
<script
    type="text/javascript"
    id = "elnr-sw-script"
    size="3"                       <!--Optional, defaults to 3-->
    placeholder="Enter keywords"   <!--Optional, defaults to "Enter keywords..."-->
    src="/js/elasticlunr/elasticlunr-search-widget.min.js"> <!--ElasticLunr Search Widget-->
</script>
```

Make sure to add it **after** the ``<script>`` where you are creating the ElasticLunr ``index``. The Index has to be in the variable ``index``, which the widget calls internally. Otherwise, you will get an error.

# Index Format

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
