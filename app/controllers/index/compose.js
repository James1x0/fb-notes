import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    saveNote () {
      const note = this.get('model');

      note.set('updated', new Date());

      note.save()
      .then(() => this.send('refresh'));
    }
  }
});
