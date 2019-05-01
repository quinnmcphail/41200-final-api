module.exports = app => {
    const lists = require("../controllers/List.controller.js");
    app.post("/lists", lists.createWithUserId);
    app.put("/lists/:listId", lists.update);
    app.delete("/lists/:listId", lists.delete);
    app.get("/lists/:userId", lists.findAllWithUserId);
    app.get("/lists/:userId/:listId", lists.findOneWithUserId);
};
