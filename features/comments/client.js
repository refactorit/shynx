if (Meteor.isClient) {
  Template.comments.events({
    "submit .new-comment": function (event) {
      var content = event.target.content.value;
      Meteor.call('addComment', this._id, content);
      return false;
    },
    "click .delete-comment": function(event) {
      var $this = this;
      SimpleAnimate(event.target.parentElement, 'bounceOutRight', function(event) {
        Meteor.call('deleteComment', $this._id);
      });
      return false;
    }
  });

  Template.comment.rendered = function() {
    var instance = this;
    Meteor.defer(function(){
      SimpleAnimate(instance.firstNode, 'flipInX');
    });
  }
}