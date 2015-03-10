define(["knockout", "text!./home.html"], function(ko, template) {
  'use strict';

  function HomeViewModel(route) {
    this.locations = ko.observableArray()
    this.map = ko.observable()
  }

  return { viewModel: HomeViewModel, template: template };

});
