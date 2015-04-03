Meteor.methods({
  addComment: function(linkId, content) {
    Links.update(
      linkId,
      { 
        $addToSet: { 
          comments: {
            _id: new Meteor.Collection.ObjectID(),
            owner: Meteor.userId(),
            content: content,
            username: Meteor.user().username
          } 
        } 
      }
    )
  },
  deleteComment: function(commentId) {
    Links.update(
      {},
      { 
        $pull: { 
          comments: { _id: commentId } 
        } 
      },
      { multi: true }
    )
  }
});
