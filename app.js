Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Router.map( function () {
  this.route('about');
  this.route('home', {
    path: '/'
  });
  this.route('comments/:id',
    {data: function() { return Links.findOne({_id: this.params.id}) }}
  );
});