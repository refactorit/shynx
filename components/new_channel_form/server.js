if( Meteor.isServer ) {
  Meteor.startup(function () {
    Meteor.methods({
      createChannel: function(doc) {
        doc.users = [Meteor.userId()];
        Channels.insert(doc);
      }
    });
  });
}