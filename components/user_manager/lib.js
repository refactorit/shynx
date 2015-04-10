Meteor.methods({
  kickFromChannel: function(channelId, userId) {
    Channels.update(
      channelId,
      { $pull: { users: userId } }
    );
  }
});