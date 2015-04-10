if(Meteor.isClient) {
  Template.navbar.helpers({
    channels: function() {
      return Channels.find({users: {$elemMatch: {$in: [Meteor.userId()]} }});
    }
  });

  Template.navbar.events({
    "click #new-channel-link": function (event) {
      Router.go('/channel/new');
      return false;
    }
  })
}
