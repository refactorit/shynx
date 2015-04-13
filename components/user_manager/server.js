if(Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      inviteUser: function(email, channelId, channelName) {
        var invitation = Invitations.insert({
          receiver: email,
          channel: channelId
        });
        Email.send({
          to: email,
          subject: "You have been invited to a Shynx channel",
          text: "You have been invited to a shynx channel " + channelName + ".\n "+ baseUrl +"invitation/" + invitation
        });
      }
    });
  });
}