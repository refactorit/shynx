Meteor.startup(function () {
  Meteor.methods({
    inviteUser: function(email, channelId) {
      var invitation = Invitations.insert({
        receiver: email,
        channel: channelId
      });
      console.log(invitation);
      // Email.send({
      //   from: "meteor.email.2014@gmail.com",
      //   to: "filip.defar@gmail.com",
      //   subject: "Meteor Can Send Emails via Gmail",
      //   text: "Its pretty easy to send emails via gmail."
      // });
    }
  });
});
