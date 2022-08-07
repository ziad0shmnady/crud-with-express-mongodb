var Userdb = require('../model/model')
const bodyParser = require('body-parser')

// create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "connect can not be empty !" })
        return
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    user.save(user).then(data => {
        res.redirect('/add-user')
    }).catch(err => {
        res.status(500).send({ message: err.message || "some error occurred while creating" })
    })
}
exports.find = (req, res) => {
    Userdb.find().then(user => {
        res.send(user)
    }).catch(err => res.status(500).send({ message: err.message || "some error occurred while creating" }))
}
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400).send({ message: "Data to update can not be empty" })

    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(404).send({ message: 'Cannot Update user' })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: 'Error update user' })
    })

}
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: 'Cannot Delete user' })
        } else {
            res.send({ message: 'User was deleted successfully' })
        }
    }).catch(err => {
        res.status(500).send({message:"Could not delete user"})
    })

}