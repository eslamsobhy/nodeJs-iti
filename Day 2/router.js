const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;

  switch (url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Cache-Control", "no-cach");

      res.write(`<html>`);
      res.write(`
        <head>
            <link rel="stylesheet" href="styles.css">
            <title>Handling Requests</title>
        </head>
        `);
      res.write(`
        <body>
        <h1>Today's meal!</h1>
        <img src="hero-min.jpg" alt="the header image" />
        </body>
      `);
      res.write("</html>");
      res.end();
      break;

    case "/styles.css":
      res.writeHead(200, {
        "Content-Type": "text/css",
        "Cache-Control": "no-cache",
      });

      const styles = fs.readFileSync("styles.css");
      res.write(styles);
      res.end();
      break;

    case "/hero-min.jpg":
      res.statusCode = 200;
      res.setHeader("Content-Type", "image/jpeg");
      const img = fs.readFileSync("hero-min.jpg");
      res.write(img);
      res.end();
      break;

    case "/favicon.ico":
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      });
      const favicon = fs.readFileSync("favicon.png");
      res.write(favicon);
      res.end();
      break;

    case "/db.json":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-cache");
      const data = fs.readFileSync("db.json");
      res.write(data);
      res.end();
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>ERROR 404</h1>");
      res.write("<h2>Not Found!</h2>");
      res.end();
      break;
  }
};

module.exports = requestHandler;
