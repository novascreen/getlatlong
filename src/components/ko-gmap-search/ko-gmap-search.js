define(["knockout"], function(ko) {
  'use strict';

  function ViewModel(params) {
    this.query = params.query || ko.observable('')
    this.result = params.result || ko.observable()
    this.map = params.map || ko.observable()

    this.query.subscribe(this.search.bind(this))
    this.map.subscribe(this.search.bind(this))
  }

  ViewModel.prototype = {
    search: function () {
      if (this.query() && this.map()) {
        var places = new google.maps.places.PlacesService(this.map())
        places.textSearch({query: this.query()}, this.gotResults.bind(this))
      }
    },

    gotResults: function(results, status) {
      if (status === 'OK') {
        this.result({
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        })
      }
    }
  }

  return { viewModel: ViewModel, template: ' ' };

});
