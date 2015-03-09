define(['knockout'], function(ko) {
  'use strict';

  function Model(params) {
    this.latitude = ko.observable(params.latitude || 0)
    this.longitude = ko.observable(params.longitude || 0)
    this.latLong = ko.computed(function () {
      return this.latitude() + ', ' + this.longitude()
    }, this)
    this.marker = ko.observable(params.marker || null)
  }

  Model.prototype = {
  }

  return Model;

});
