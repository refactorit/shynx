Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    links: function () {
      return Links.find({}, {sort: {createdAt: -1}});
    },
    myFavorites: function() {
      return Links.find(
        {favoritedBy: { $elemMatch: {owner: Meteor.userId()} }},
        {sort: {createdAt: -1}}
      );
    },
    myFavoritesCount: function() {
      return Links.find({favoritedBy: { $elemMatch: {owner: Meteor.userId()} }}).count();
    }
  });

  Template.body.events({
    "submit .new-link": function (event) {
      var href = event.target.href.value;
      Meteor.call("addLink", href);
      event.target.href.value = "";
      return false;
    },
    "click .like": function() {
      Meteor.call("like",this._id)
      return false;
    },
    "click .unlike": function() {
      Meteor.call("unlike",this._id)
      return false;
    },
    "click .favorite": function() {
      Meteor.call('markAsFavorite', this._id)
      return false;
    },
    "click .unfavorite": function() {
      Meteor.call('unmarkAsFavorite', this._id)
      return false;
    },
    "click .tab-select": function(event) {
      Session.set("activeTab", $(event.target).attr('href'));
      return false;
    },
    "click .mark-as-read": function(event) {
      Meteor.call('setStatus', this._id, "read")
    },
    "click .save": function(event) {
      Meteor.call('setStatus', this._id, "saved")
    },
    "click .not-interesting": function(event) {
      Meteor.call('setStatus', this._id, "not-interesting")
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('HH:mm DD/MM/YYYY');
  });

  Template.registerHelper('currentTab', function(name) {
    var activeTab = Session.get("activeTab");
    if(!activeTab) {
      activeTab = "feed"
    }
    return (name ==  activeTab);
  });

  Template.registerHelper('didLike', function(linkId) {
    var likesByUser = Links.find({
      _id: linkId,
      likes: { $elemMatch: {owner: Meteor.userId()} }
    }).count();
    return (likesByUser > 0);
  });

  Template.registerHelper('isFavorite', function(linkId) {
    var likesByUser = Links.find({
      _id: linkId,
      favoritedBy: { $elemMatch: {owner: Meteor.userId()} }
    }).count();
    return (likesByUser > 0);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      addLink: function(href) {
        Meteor.http.get(href, function(error, data) {
          var titleMatch = data.content.match(/<title>(.+)<\/title>/i);
          var title = href;
          if( titleMatch ) {
            title = titleMatch[1]
          }
          console.log(title);
          Links.insert({
            title: title,
            href: href,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
          });
        });
      }
    });
  });
}

Meteor.methods({
  setStatus: function(linkId, status) {
    Links.update(
      linkId,
      { $pull: { statuses: {owner: Meteor.userId() } } }
    )
    Links.update(
      linkId,
      { $addToSet: { statuses: {owner: Meteor.userId(), status: status } } }
    )
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
  },
  unmarkAsFavorite: function(linkId) {
    Links.update(
      linkId,
      { $pop: { favoritedBy: {owner: Meteor.userId(), username: Meteor.user().username } } }
    )
  }
});