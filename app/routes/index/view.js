import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model ({ note_id }) {
    return this.get('store').find('note', note_id);
  }
});
