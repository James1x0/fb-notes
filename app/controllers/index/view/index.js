import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    deleteForever () {
      if (!confirm('Are you sure???')) {
        return;
      }

      this.get('model').destroyRecord()
      .then(() => this.transitionToRoute('index.compose'));
    }
  }
});
