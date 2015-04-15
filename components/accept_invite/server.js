if(Meteor.isServer) {
  Meteor.publish("invitations", function(invitationId){
    return Invitations.find({ _id: invitationId })
  });
}