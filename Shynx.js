Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    links: function () {
      return Links.find({});
    }
  });

  Template.body.events({
    "submit .new-link": function (event) {
      var title = event.target.title.value;
      var href = event.target.href.value;

      Meteor.call("addLink", title, href);

      // Clear form
      event.target.title.value = "";
      event.target.href.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addLink: function(title, href) {
    Links.insert({
      title: title,
      href: href,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});