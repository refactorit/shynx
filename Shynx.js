Links = new Mongo.Collection("links");
Likes = new Mongo.Collection("likes");

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
      username: Meteor.user().username,
      likes: []
    });
  },
  like: function(linkId) {
    // Tasks.update(taskId, { $set: { checked: setChecked} });
    var likesByUser = Links.find({
      _id: linkId,
      likes: { $elemMatch: {owner: Meteor.userId()} }
    }).count();

    if( likesByUser == 0) {
      Links.update(
        linkId,
        { $push: { likes: {owner: Meteor.userId(), username: Meteor.user().username } } }
      )
    }
  },
  unlike: function(linkId) {
    // Tasks.update(taskId, { $set: { checked: setChecked} });
    var likesByUser = Links.find({
      _id: linkId,
      likes: { $elemMatch: {owner: Meteor.userId()} }
    }).count();

    if( likesByUser > 0) {
      Links.update(
        linkId,
        { $pop: { likes: {owner: Meteor.userId(), username: Meteor.user().username } } }
      )
    }
  },
});