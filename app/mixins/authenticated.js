import Ember from 'ember';

const { Mixin, inject: { service } } = Ember;

export default Mixin.create({
  session: service(),

  beforeModel () {
    if (!this.get('session.isAuthenticated')) {
      return this.transitionTo('sign-in');
    }

    this._super(...arguments);
  }
});
