# Use to create local host
# from https://stackoverflow.com/a/60638762
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
      ".js": "application/javascript",
});

httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()