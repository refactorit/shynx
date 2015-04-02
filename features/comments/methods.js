Meteor.methods({
  addComment: function(linkId, content) {
    Links.update(
      linkId,
      { 
        $addToSet: { 
          comments: {
            owner: Meteor.userId(),
            content: content,
            username: Meteor.user().username
          } 
        } 
      }
    )
  }
});
