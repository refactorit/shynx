Template.newChannel.helpers({
  channels: function() {
    return Channels.find({});
  }
});

Template.newChannel.events({
  "submit #new-channel": function (event) {
    var name = event.target.name.value;
    if(name.length > 0) {
      Channels.insert({name: name});
    }
    event.target.name.value = "";
    return false;
  }
});
