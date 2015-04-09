Template.invitations.events({
  "submit #new-invitation": function (event) {
    console.log("Caught!");
    Meteor.call("inviteUser", event.target.email.value, this._id);
    return false;
  }
});