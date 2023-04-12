const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // ...
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log("connected", id);
  socket.on("send-message", ({ recipients, text }) => {
    console.log("send-message", recipients, text);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
    //       socket.broadcast.emit("receive-message", {
    //     recipients: recipients,
    //     sender: id,
    //     text,
    //   });
  });
});

httpServer.listen(5000);