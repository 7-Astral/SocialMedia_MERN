const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => userId === user.userId) && users.push({ userId, socketId })
} 
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const deleteUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}
io.on("connection", (socket) => {
    console.log("User is Connected");
    io.emit("welcome", "Hello from Socket Server!!");
    
    socket.on("getUser",()=>{
    io.emit("getUsers",users);
    })

    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => { 
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
        io.emit("getUsers", users);
    });    
    socket.on("sendNotification", ({ senderId,senderName, receiverId, type ,picture,text,nId}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getNotification", {
            senderId,
            senderName,
            receiverId,
            type,
            picture,
            text,
            nId,
          });
          io.emit("getUsers", users);
    });  
    socket.on("sendRequest", ({ senderId,senderName, receiverId, type ,profilePicture,nId}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getRequest", {
            senderId,
            senderName,
            receiverId,
            type,
            profilePicture,      
            nId,
          });
          io.emit("getUsers", users);  
    });    


    socket.on("disconnect", () => {
        console.log("user is disconected");
        deleteUser(socket.id);
        io.emit("getUsers", users);
    })
})

 