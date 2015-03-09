define(["knockout", "text!./gll-map.html", 'app/location/Model'], function(ko, template, LocationModel) {
  'use strict';

  function GllMapViewModel(params) {
    this.map = params.map || ko.observable()
    this.mapCenter = {
      latitude: ko.observable(0),
      longitude: ko.observable(0)
    };
    this.locations = params.locations || ko.observableArray()
    this.locations.subscribe(this.onLocationsChange.bind(this))
  }

  GllMapViewModel.prototype = {
    onMapReady : function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onGotCurrentPosition.bind(this));
      }
      google.maps.event.addListener(this.map(), 'click', this.onMapClick.bind(this))
    },

    onGotCurrentPosition: function (position) {
      this.mapCenter.latitude(position.coords.latitude)
      this.mapCenter.longitude(position.coords.longitude)
    },

    onMapClick: function (event) {
        this.locations.push(new LocationModel({
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        }))
    },

    onLocationsChange: function (newModels) {
      newModels.forEach(function (model, index) {
        if (!model.marker()) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(model.latitude(), model.longitude()),
            map: this.map(),
            draggable: true,
            icon: 'http://www.googlemapsmarkers.com/v1/' + (index + 1) + '/2196f3/FFFFFF/2196f3/'
          })
          model.marker(marker)
          google.maps.event.addListener(marker, 'dragend', function (event) {
            this.onDragEnd(event, model)
          }.bind(this))
        }
      }.bind(this))
    },

    onDragEnd: function (event, model) {
      model.latitude(event.latLng.lat())
      model.longitude(event.latLng.lng())
    }
  }

  return { viewModel: GllMapViewModel, template: template };

});
