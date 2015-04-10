Meteor.methods({
  joinChannel: function(channelId, userId, invitationId) {
    Channels.update(
      channelId,
      { $addToSet: { users: userId } }
    );
    Invitations.remove({_id: invitationId});
    Router.go("/channel/"+channelId);
  }
});