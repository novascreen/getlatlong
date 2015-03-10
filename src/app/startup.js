define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections', 'knockout-select-on-focus'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('home-page', { require: 'components/home-page/home' });
  ko.components.register('ko-gmap', { require: 'components/ko-gmap/ko-gmap' });
  ko.components.register('ko-gmap-search', { require: 'components/ko-gmap-search/ko-gmap-search' });
  ko.components.register('gll-map', { require: 'components/gll-map/gll-map' });
  ko.components.register('gll-search', { require: 'components/gll-search/gll-search' });
  ko.components.register('gll-locations', { require: 'components/gll-locations/gll-locations' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
  ko.components.register('gll-card', { template: { require: 'text!components/gll-card/gll-card.html' } });

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
