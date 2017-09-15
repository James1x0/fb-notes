import Ember from 'ember';

const { Route, run: { scheduleOnce, later, cancel } } = Ember;

export default Route.extend({
  autosaveInterval: 10000,

  model () {
    return this.get('store').createRecord('note');
  },

  afterModel () {
    scheduleOnce('afterRender', () => this.autosave())
  },

  autosave () {
    this.set('_autosaveTimer', later(() => {
      const controller = this.get('controller'),
            note = controller.get('model');

      if (!note || !note.get('title') || !note.get('text') || Object.keys(note.changedAttributes()).length < 1) {
        return this.autosave();
      }

      controller.set('isAutosaving', true);

      note.save()
      .then(() => {
        controller.setProperties({
          isAutosaving: false,
          didAutosave: new Date()
        });
        this.autosave();
      });
    }, this.get('autosaveInterval')));
  },

  cancelAutosave () {
    if (this.get('_autosaveTimer')) {
      cancel(this.get('_autosaveTimer'));
    }
  },

  actions: {
    refresh () {
      this.cancelAutosave();
      this.refresh();
    },

    willTransition (transition) {
      this.cancelAutosave();
      var model = this.controller.get('model');

      if (!model || !model.get('isNew')) {
        return true;
      }

      if (Object.keys(model.changedAttributes()).length > 0 && !confirm('This note isn\'t saved. Are you sure?')) {
        transition.abort();
      } else {
        model.destroyRecord();
        return true;
      }
    }
  }
});
