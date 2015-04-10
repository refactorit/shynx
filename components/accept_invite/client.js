if( Meteor.isClient ) {
  Template.invitation.events({
    "click #join-channel": function (event) {
      Meteor.call("joinChannel", this.channel, Meteor.userId(), this._id);
      return false;
    }
  });
}