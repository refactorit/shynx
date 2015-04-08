if (Meteor.isClient) {
  Template.home.helpers({
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
    }
  });

  Template.feed.helpers({
    newLinks: function() {
      return Links.find({
          statuses: {
            $not: { $elemMatch: {owner: Meteor.userId()} }
          }
        },
        {sort: {createdAt: -1}}
      );
    }
  });

  Template.home.events({
    "submit .new-link": function (event) {
      var href = event.target.href.value;
      $("#new-link-loader").removeClass("hide");
      Meteor.call("addLink", href, function() {
        $("#new-link-loader").addClass("hide");
      });
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
    },
    "click .recommend": function(event) {
      Meteor.call('recommend', this._id);
      $(event.target).find(".badge").addClass("animated bounce");
      return false;
    }
  });

  Template.registerHelper('hasStatus', function(status) {
    return Links.find(
        {_id: this._id, statuses: { $elemMatch: {owner: Meteor.userId(), status: status} }}
      ).count() > 0;
  });

  Template.registerHelper('recommendsCount', function() {
    return this.recommends ? this.recommends.length : 0;
  });

  Template.registerHelper('currentTab', function(name) {
    var activeTab = Session.get("activeTab");
    if(!activeTab) {
      activeTab = "feed"
    }
    return (name ==  activeTab);
  });

  Template.feed.rendered = function() {
    var $this = this;
    Meteor.defer(function(){
      $('[data-toggle="tooltip"]').tooltip()
      $this.firstNode.parentNode._uihooks = {
        insertElement: function(node, next) {
          console.log("Inserting element uihook");
          $(node).addClass('animated zoomInUp').insertBefore(next);
        },
        removeElement: function(node) {
          console.log("REmoving link uihook");
          $(node).addClass('animated fadeOutRight')
            .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $(node).remove()
            });
        }
      }
    });
  }
}