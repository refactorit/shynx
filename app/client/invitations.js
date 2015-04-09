Template.invitations.events({
  "submit #new-invitation": function (event) {
    Meteor.call("inviteUser", event.target.email.value, this._id);
    return false;
  }
});

Template.invitation.events({
  "click #join-channel": function (event) {
    Meteor.call("joinChannel", this.channel, Meteor.userId(), this._id);
    return false;
  }
});