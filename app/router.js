import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in', { path: '/' });

  this.route('index', { path: '/notes' }, function() {
    this.route('index', { path: '/' });
    this.route('compose');
    this.route('view', { path: '/:note_id' }, function() {
      this.route('edit');
    });
  });
});

export default Router;
