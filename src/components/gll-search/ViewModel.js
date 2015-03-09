define(["knockout", "text!./view.html", 'app/location/Model'], function(ko, template, LocationModel) {
  'use strict';

  function ViewModel(params) {
    this.query = params.query || ko.observable('');
    this.result = params.result || ko.observable();
    this.map = params.map || ko.observable();
    this.locations = params.locations || ko.observableArray()

    this.result.subscribe(this.onResultChange.bind(this))
  }

  ViewModel.prototype = {
    onResultChange: function (location) {
      this.map().setCenter({ lat: location.latitude, lng: location.longitude })
      this.locations.push(new LocationModel({
        latitude: location.latitude, longitude: location.longitude
      }))
    }
  }

  return { viewModel: ViewModel, template: template };

});
