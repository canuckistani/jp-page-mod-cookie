// Import the page-mod API
let pageMod = require("sdk/page-mod");
// Import the self API
let self = require("sdk/self");

function parseCookie(s) {
    return s.split(';').map(function(p) { return p.split('='); });
}

pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery-1.7.min.js"),
                      self.data.url("my-script.js")],
  onAttach: function(worker) {
      worker.port.on('send-cookie', function(data) {
        console.log('Cookie data from %s', worker.tab.url);
        console.dir(parseCookie(data));
      });
  }
});
