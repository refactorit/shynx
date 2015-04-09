Template.channelToolbar.helpers({
  channels: function() {
    return Channels.find({});
  }
});

Template.newChannel.events({
  "submit #new-channel": function (event) {
    var name = event.target.name.value;
    if(name.length > 0) {
      Channels.insert({
        name: name,
        users: [{_id: Meteor.userId()}]
      });
    }
    event.target.name.value = "";
    return false;
  }
});

Template.channelToolbar.events({
  "change #channel-select": function(event) {
    Router.go('/channel/'+event.target.value)
  }
});
