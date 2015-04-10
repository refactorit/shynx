Template.navbar.helpers({
  channels: function() {
    return Channels.find({});
  }
});

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

Template.navbar.events({
  "change #channel-select": function(event) {
    Router.go('/channel/'+event.target.value)
  }
});
