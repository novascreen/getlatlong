define(["knockout", "text!./home.html"], function(ko, template) {
  'use strict';

  function ViewModel(route) {
    this.locations = ko.observableArray()
    this.map = ko.observable()
  }

  return { viewModel: ViewModel, template: template };

});
