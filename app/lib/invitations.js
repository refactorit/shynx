Meteor.methods({
  joinChannel: function(channelId, userId, invitationId) {
    Channels.update(
      channelId,
      { $addToSet: { users: userId } }
    );
    Invitations.remove({_id: invitationId});
    Router.go("/channel/"+channelId);
  },
  kickFromChannel: function(channelId, userId) {
    Channels.update(
      channelId,
      { $pull: { users: userId } }
    );
  }
});