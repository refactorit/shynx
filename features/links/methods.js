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
