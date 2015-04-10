if(Meteor.isClient) {
  Template.userManager.helpers({
    usersInChannel: function() {
      return Meteor.users.find({_id: {$in: this.users }});
    }
  });

  Template.userManager.events({
    "submit #new-invitation": function (event) {
      Meteor.call("inviteUser", event.target.email.value, this._id);
      event.target.email.value = "";
      alert("Invitation has been sent.");
      return false;
    },
    "click .kick-out": function () {
      var channelId = Template.parentData(this)._id;
      Meteor.call("kickFromChannel", channelId, this._id);
      return false;
    }
  });
}