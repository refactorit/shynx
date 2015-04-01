Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    links: function () {
      return Links.find({}, {sort: {createdAt: -1}});
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
    },
    "click .like": function() {
      Meteor.call("like",this._id)
    },
    "click .unlike": function() {
      Meteor.call("unlike",this._id)
    },
    "click .favorite": function() {
      Meteor.call('markAsFavorite', this._id)
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('HH:mm DD/MM/YYYY');
  });

  Template.registerHelper('didLike', function(linkId) {
    var likesByUser = Links.find({
      _id: linkId,
      likes: { $elemMatch: {owner: Meteor.userId()} }
    }).count();
    return (likesByUser > 0);
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
  },
  like: function(linkId) {
    Links.update(
      linkId,
      { $addToSet: { likes: {owner: Meteor.userId(), username: Meteor.user().username } } }
    )
  },
  unlike: function(linkId) {
    Links.update(
      linkId,
      { $pop: { likes: {owner: Meteor.userId()} } }
    )
  },
  markAsFavorite: function(linkId) {
    Links.update(
      linkId,
      { $addToSet: { favoritedBy: {owner: Meteor.userId(), username: Meteor.user().username } } }
    )
  }
});