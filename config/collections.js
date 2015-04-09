Links = new Mongo.Collection("links");
Channels = new Mongo.Collection("channels");
Channels.attachSchema(new SimpleSchema({
  name:  {
    type: String,
    label: "Name",
    max: 50,
    min: 5
  },
  users: {
    type: [String],
    optional: true
  }
}));
Invitations = new Mongo.Collection("invitations");
