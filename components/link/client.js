if (Meteor.isClient) {
  Template.registerHelper('hasStatus', function(status) {
    return Links.find(
        {_id: this._id, statuses: { $elemMatch: {owner: Meteor.userId(), status: status} }}
      ).count() > 0;
  });

  Template.registerHelper('recommendsCount', function() {
    return this.recommends ? this.recommends.length : 0;
  });

  Template.channel.events({
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
      return false;
    }
  });

}