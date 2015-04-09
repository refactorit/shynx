Meteor.startup(function () {
  Meteor.methods({
    createChannel: function(name) {
      return Channels.insert({
        name: name,
        users: [{_id: Meteor.userId()}]
      });
    },
    addCurrentUserToChannel: function(channel) {
      channel.users = [ Meteor.userId() ];
      Channels.insert(channel)  
    }
  });
});
