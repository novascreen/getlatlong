define(['knockout', 'jquery', 'text!./ko-gmap.html',  'async'], function(ko, $, template) {
  'use strict';
  /* global google */

  function createViewModel (params, componentInfo) {
    params.el = componentInfo.element
    return new KoMap(params)
  }

  function KoMap(params) {
    this.el = params.el
    this.apiKey = params.apiKey || ko.observable()
    this.libraries = params.zoom || ko.observable('places')
    this.latitude = params.latitude || ko.observable(0)
    this.longitude = params.longitude || ko.observable(0)
    this.zoom = params.zoom || ko.observable(10)
    this.disableDefaultUI = typeof params.disableDefaultUI !== 'undefined' ? params.disableDefaultUI : false
    this.map = params.map || ko.observable()

    this.latitude.subscribe(this.updateCenter.bind(this))
    this.longitude.subscribe(this.updateCenter.bind(this))

    var mapApi = 'http://maps.google.com/maps/api/js?sensor=false'
    mapApi = this.libraries() ? mapApi + '&libraries=' + this.libraries() : mapApi
    mapApi = this.apiKey() ? mapApi + '&key=' + this.apiKey() : mapApi

    require(['async!' + mapApi], this.mapApiLoaded.bind(this))
  }

  KoMap.prototype.mapApiLoaded = function () {
    var mapEl = this.el.getElementsByTagName('div')[0]
    this.map(new google.maps.Map(mapEl, this.getMapOptions()))

    $(this.el).trigger('ko-gmap-ready')
  }

  KoMap.prototype.getMapOptions = function () {
    var mapOptions = {
      zoom: this.zoom(),
      center: new google.maps.LatLng(this.latitude(), this.longitude()),
      disableDefaultUI: this.disableDefaultUI
    }
    return mapOptions
  }

  KoMap.prototype.updateCenter = function () {
    if (this.map()) {
      this.map().setCenter({ lat: this.latitude(), lng: this.longitude()})
    }
  }

  return { viewModel: {
    createViewModel: createViewModel
  }, template: template }
})
