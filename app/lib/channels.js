Meteor.methods({
  addCurrentUserToChannel: function(channel) {
    channel.users = [ Meteor.userId() ];
    var channelId = Channels.insert(channel);
    if(Meteor.isClient) {
      Router.go('/channel/' + channelId);
    }
  }
});
