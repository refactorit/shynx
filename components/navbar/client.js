if(Meteor.isClient) {
  Meteor.subscribe("channels");

  Template.navbar.helpers({
    channels: function() {
      return Channels.find({});
    }
  });

  Template.navbar.events({
    "click #new-channel-link": function (event) {
      Router.go('/channel/new');
      return false;
    }
  })
}
