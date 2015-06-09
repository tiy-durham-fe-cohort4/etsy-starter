'use strict';

var $ = require('jquery');
var router = require('../router');
var settings = require('../settings');
var EtsyService = require('../services/etsy-service');
var view = require('../utils/view');
var queryString = require('../utils/query-string');

router.route('', 'listings?*query', function (query) {
  var etsy = new EtsyService({ apiKey: settings.etsyApiKey });
  var searchValues = queryString(query);
  
  etsy.listings(searchValues)
    .done(showListings)
    .fail(showError);
    
  function showListings (listings) {
    // Show data as HTML
    view.render('listings', { 
      searchValues: searchValues, 
      listings: listings.results.map(viewModel) 
    });
    
    // Bind events
    $('.search-listings').parsley();
    $('.search-listings').on('submit', function (e) {
      e.preventDefault();
      
      var searchUrl = $(this).serialize();
      
      location.hash = '#listings?' + searchUrl;
    });
  }
  
  function showError(req, status, err) {
    console.error(err || status);
    alert('Ruh roh!');
  }
});


// Convert the Etsy data model into a form that is more easy for our templates
function viewModel(listing) {
  return {
    id: listing.listing_id,
    imgUrl: listing.MainImage.url_170x135,
    description: listing.description,
    price: listing.price,
    tags: listing.tags,
    breadCrumb: listing.taxonomy_path,
    title: listing.title,
    externalUrl: listing.url,
    userId: listing.user_id 
  };
}