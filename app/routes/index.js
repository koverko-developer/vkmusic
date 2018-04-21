const noteRoutes = require('./note_routes');
module.exports = function(app, cookie,iconv, request, querystring, curl) {
  noteRoutes(app, cookie,iconv, request, querystring);
  // Тут, позже, будут и другие обработчики маршрутов
};
