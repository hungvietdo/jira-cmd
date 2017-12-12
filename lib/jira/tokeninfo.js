/*global requirejs,define,fs*/
define([
  'superagent',
  'cli-table2',
  '../../lib/config'
], function (request, Table, config) {

  var tokeninfo = {
    project: null,
    query: null,
    type: null,
    issues: null,
    table: null,

    getinfo: function () {
      var that = this,
        i = 0;
      request
        .get(config.auth.url)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + config.auth.token)
        .end(function (res) {
          if (!res.ok) {
            return console.log((res.body.errorMessages || [res.error]).join('\n'));
          }

          that.table = new Table({
            head: ['API URL', 'Token value']
          });

          that.table.push([
            config.auth.url,
            config.auth.token
          ]);
        });
    }
  };
  return tokeninfo;
});
