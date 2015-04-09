Meteor.startup(function () {
  Meteor.methods({
    inviteUser: function(email, channelId, channelName) {
      var invitation = Invitations.insert({
        receiver: email,
        channel: channelId
      });
      console.log(invitation);
      Email.send({
        to: email,
        subject: "You have been invited to a Shynx channel",
        text: "You have been invited to a shynx channel " + channelName + ".\n http://localhost:3000/invitation/" + invitation
      });
    },
    joinChannel: function(channelId, userId, invitationId) {
      Channels.update(
        channelId,
        { $addToSet: { users: {_id: userId } } }
      );
    }
  });
});
