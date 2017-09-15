import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  title: attr('string'),
  text: attr('string'),

  updated: attr('date'),
  created: attr('date', {
    defaultValue: () => new Date()
  })
});
