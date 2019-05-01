const List = require("../models/List.model.js");

exports.createWithUserId = (req, res) => {
    if (Object.entries(req.body).length === 0 && obj.constructor === Object) {
        return res.status(400).send({
            message: "List content can not be empty"
        });
    }

    const list = new List({
        uuid: req.body.uuid,
        stores: req.body.stores
    });

    list
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the List."
            });
        });
};

exports.findAllWithUserId = (req, res) => {
    List.find({ uuid: req.params.userId })
        .then(lists => {
            res.send(lists);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving lists."
            });
        });
};

exports.findOneWithUserId = (req, res) => {
    List.find({ uuid: req.params.userId, _id: req.params.listId })
        .then(lists => {
            res.send(lists);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving lists."
            });
        });
}

exports.update = (req, res) => {
    if (Object.entries(req.body).length === 0 && obj.constructor === Object) {
        return res.status(400).send({
            message: "List content can not be empty"
        });
    }

    List.findByIdAndUpdate(
        req.params.listId,
        {
            uuid: req.body.uuid,
            stores: req.body.stores
        }
    ).then(list => {
        if (!list) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(list);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
}

exports.delete = (req, res) => {
    List.findByIdAndRemove(req.params.listId)
        .then(list => {
            if (!list) {
                return res.status(404).send({
                    message: "List not found with id " + req.params.listId
                });
            }
            res.send({ message: "List deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "List not found with id " + req.params.listId
                });
            }
            return res.status(500).send({
                message: "Could not delete list with id " + req.params.listId
            });
        });
}