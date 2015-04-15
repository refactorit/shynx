if(Meteor.isServer) {
  Meteor.publish("links", function(channelId) {
    return Links.find({channel: channelId});
  })
}