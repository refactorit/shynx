if (Meteor.isClient) {
  Template.comments.events({
    "submit .new-comment": function (event) {
      var content = event.target.content.value;
      Meteor.call('addComment', this._id, content);
      return false;
    },
    "click .delete-comment": function(event) {
      var $this = this;
      $(event.target.parentElement).addClass('animated bounceOutRight');
      $(event.target.parentElement).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function(event) {
          console.log("animation ended - start delete");
          Meteor.call('deleteComment', $this._id);
        }
      );
      return false;
    }
  });


}