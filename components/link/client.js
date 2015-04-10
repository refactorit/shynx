if (Meteor.isClient) {
  Template.registerHelper('hasStatus', function(status) {
    return Links.find(
        {_id: this._id, statuses: { $elemMatch: {owner: Meteor.userId(), status: status} }}
      ).count() > 0;
  });

  Template.registerHelper('recommendsCount', function() {
    return this.recommends ? this.recommends.length : 0;
  });
}