define(["knockout", "text!./gll-locations.html"], function(ko, template) {
  'use strict';

  function GllLocations(params) {
    this.locations = params.locations || ko.observableArray()
  }

  GllLocations.prototype = {
  }

  return { viewModel: GllLocations, template: template };

});
