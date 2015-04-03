if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

 
  Template.comments.events({
    "submit .new-comment": function (event) {
      var content = event.target.content.value;
      Meteor.call('addComment', this._id, content);
      return false;
    },
    "click .delete-comment": function() {
      console.log("DELETEEE!");
      Meteor.call('deleteComment', this._id);
      return false;
    }
  });


}