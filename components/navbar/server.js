if(Meteor.isServer) {
  Meteor.publish("channels", function(){
    return Channels.find({users: {$elemMatch: {$in: [this.userId]} }});
  });
}