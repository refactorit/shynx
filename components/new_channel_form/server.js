if( Meteor.isServer ) {
  Meteor.startup(function () {
    Meteor.methods({
      createChannel: function(name) {
        return Channels.insert({
          name: name,
          users: [{_id: Meteor.userId()}]
        });
      }
    });
  });
}