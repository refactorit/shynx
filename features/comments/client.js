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

  Template.comments.rendered = function() {
    var instance = this;
    Meteor.defer(function(){
      $("#comments").get(0)._uihooks = {
        insertElement: function(node, next) {
          console.log("Inserting comment uihook");
          $(node).addClass('animated fadeInUp').insertBefore(next);
        }
      }
    });
  }
}