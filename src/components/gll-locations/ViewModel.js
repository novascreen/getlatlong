define(["knockout", "text!./view.html"], function(ko, template) {
  'use strict';

  function ViewModel(params) {
    this.locations = params.locations || ko.observableArray()
  }

  ViewModel.prototype = {
  }

  return { viewModel: ViewModel, template: template };

});
