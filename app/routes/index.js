import Ember from 'ember';
import authenticated from '../mixins/authenticated';

const { Route } = Ember;

export default Route.extend(authenticated, {
  model () {
    return this.get('store').findAll('note');
  }
});
