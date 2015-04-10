if( Meteor.isClient) {
  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('HH:mm DD/MM/YYYY');
  });
}
