const http = require("http");
const fs = require("fs");
const { log } = require("console");

const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method, req.headers);
  //   process.exit(); // Stopped the server

  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write(`
        <form action="/message" method="POST">
            <input type="text" name="message"/>
            <input type="submit" value="Send">
        </form>
    `);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      //   console.log(chunck);
      body.push(chunck);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      //   console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // This is a blocking function that is inconvenient if the data we're writing to the file is too big
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.write(`<h1>Hello There!</h1>`);
  res.end();
});

server.listen(8000);
