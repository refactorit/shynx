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
});