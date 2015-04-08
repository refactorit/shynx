if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      addLink: function(href) {
        Meteor.http.get(href, function(error, data) {
          var titleMatch = data.content.match(/<title>(.+)<\/title>/i);
          var title = href;
          if( titleMatch ) {
            title = titleMatch[1]
          }
          Links.insert({
            title: title,
            href: href,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
          });
        });
      }
    });
  });
}