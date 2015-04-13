Meteor.methods({
  addLink: function(doc) {
    console.log("Adding link");
    doc.owner = Meteor.userId();
    doc.username = Meteor.user().username;
    doc.createdAt = new Date();
    doc.title = doc.href;
    if (Meteor.isServer) {
      Meteor.http.get(doc.href, function(error, data) {
        if(data) {
          var titleMatch = data.content.match(/<title>(.+)<\/title>/i);
          if( titleMatch ) {
            doc.title = titleMatch[1];
          }
        }
        Links.insert(doc);
      });
    }
  }
});
