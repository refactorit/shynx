if (Meteor.isClient) {
  Template.channel.events({
    "click .tab-select": function(event) {
      Session.set("activeTab", $(event.target).attr('href'));
      return false;
    }
  });

  Template.registerHelper('currentTab', function(name) {
    var activeTab = Session.get("activeTab");
    if(!activeTab) {
      activeTab = "feed"
    }
    return (name ==  activeTab);
  });

  Template.channel.helpers({
    savedLinks: function() {
      return Links.find(
        {statuses: { $elemMatch: {owner: Meteor.userId(), status: "saved"} }},
        {sort: {createdAt: -1}}
      );
    },
    savedCount: function() {
      return Links.find({statuses: { $elemMatch: {owner: Meteor.userId(), status: "saved"} }}).count();
    },
    readLinks: function() {
      return Links.find(
        {statuses: { $elemMatch: {owner: Meteor.userId(), status: "read"} }},
        {sort: {createdAt: -1}}
      );
    },
    trashedLinks: function() {
      return Links.find(
        {statuses: { $elemMatch: {owner: Meteor.userId(), status: "not-interesting"} }},
        {sort: {createdAt: -1}}
      );
    },
    newLinks: function() {
      return Links.find(
          {
            statuses: {
              $not: { $elemMatch: {owner: Meteor.userId()} }
            }
        },
        {sort: {createdAt: -1}}
      );
    }
  });
}
