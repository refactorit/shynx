Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    newLinks: function() {
      return Links.find({
          statuses: {
            $not: { $elemMatch: {owner: Meteor.userId()} }
          }
        },
        {sort: {createdAt: -1}}
      );
    },
    savedLinks: function() {
      return Links.find(
        {statuses: { $elemMatch: {owner: Meteor.userId(), status: "saved"} }},
        {sort: {createdAt: -1}}
      );
    },
    savedCount: function() {
      return Links.find({statuses: { $elemMatch: {owner: Meteor.userId(), status: "saved"} }}).count();
    }
  });

  Template.body.events({
    "submit .new-link": function (event) {
      var href = event.target.href.value;
      Meteor.call("addLink", href);
      event.target.href.value = "";
      return false;
    },
    "click .tab-select": function(event) {
      Session.set("activeTab", $(event.target).attr('href'));
      return false;
    },
    "click .mark-as-read": function(event) {
      Meteor.call('setStatus', this._id, "read");
      return false;
    },
    "click .save": function(event) {
      Meteor.call('setStatus', this._id, "saved");
      return false;
    },
    "click .not-interesting": function(event) {
      Meteor.call('setStatus', this._id, "not-interesting");
      return false;
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
  }
});