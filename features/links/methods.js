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
  recommend: function(linkId) {
    Links.update(
      linkId,
      { $addToSet: { recommends: {owner: Meteor.userId(), username: Meteor.user().username } } }
    );
    
  },
  unrecommend: function(linkId) {
    Links.update(
      linkId,
      { $pull: { recommends: {owner: Meteor.userId() } } }
    );
  }
});
