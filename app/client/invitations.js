Template.invitations.events({
  "submit #new-invitation": function (event) {
    Meteor.call("inviteUser", event.target.email.value, this._id);
    event.target.email.value = "";
    alert("Invitation has been sent.");
    return false;
  }
});

Template.invitation.events({
  "click #join-channel": function (event) {
    Meteor.call("joinChannel", this.channel, Meteor.userId(), this._id);
    return false;
  }
});

Template.invitations.helpers({
  usersInChannel: function() {
    return Meteor.users.find({_id: {$in: this.users }});
  }
});