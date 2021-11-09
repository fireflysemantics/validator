var ghpages = require("gh-pages");

ghpages.publish("doc",
  {
    repo: "git@github.com:fireflysemantics/validator.git"
  },
  function (err) {
    if (err) {
      console.error(err);
    }
  }
);