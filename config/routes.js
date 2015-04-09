Router.map( function () {
  this.route('about');
  this.route('home', {
    path: '/'
  });
  this.route('channel/:_id/invite', function(){
    this.render('Invitations', { data: function() {
      return Channels.findOne({ _id: this.params._id })
    }});
  });
  this.route('channel/:_id', function(){
    this.render('Channel', { data: function() {
      return Channels.findOne({ _id: this.params._id })
    }});
  });
  this.route('invitation/:_id', function(){
    this.render('invitation', { data: function() {
      return Invitations.findOne({ _id: this.params._id })
    }})
  });
});