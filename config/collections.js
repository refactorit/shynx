Links = new Mongo.Collection("links");
Links.attachSchema(new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  href: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: "Link"
  },
  owner: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  channel: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
}));

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
