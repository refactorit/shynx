if(Meteor.isClient) {
  Template.newChannel.events({
    "submit #new-channel": function (event) {
      var name = event.target.name.value;
      if(name.length > 0) {
        Meteor.call("createChannel", name);
      }
      event.target.name.value = "";
      return false;
    }
  });
}