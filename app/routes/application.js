import Ember from 'ember';

const { Route, inject: { service }, Logger: { debug } } = Ember;

export default Route.extend({
  session: service(),

  beforeModel () {
    return this.get('session')
    .fetch()
    .catch(err => {
      debug(err);
    });
  },

  actions: {
    signIn (provider) {
      this.get('session')
      .open('firebase', {
        provider,
        settings: {
          scope: 'user'
        }
      })
      .then(data => {
        console.log(data);
        this.transitionTo('index');
      });
    },

    signOut () {
      this.get('session')
      .close()
      .then(() => {
        this.transitionTo('sign-in');
      });
    }
  }
});
