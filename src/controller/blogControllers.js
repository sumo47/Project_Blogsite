const { get } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const {isValid} = require("../validation/validation")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let { title, body, authorId, category } = data

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "title is mandotary" })

        if (!isValid(body)) return res.status(400).send({ status: false, msg: "body is mandotary" })

        if (!isValid(authorId)) return res.status(400).send({ status: false, msg: "authorId is mandotary" })

        if (!isValid(category)) return res.status(400).send({ status: false, msg: "category is mandotary" })

        let id = data.authorId

        let checkAuthor = await authorModel.findById(id);
        if (!checkAuthor) { return res.status(404).send({ status: false, msg: "Author not exist" }) }

        const resultData = await blogModel.create(data)
        res.status(201).send({ status: true, msg: resultData })

    } catch (err) {
        res.status(500).send({ staus: false, message: err.message })
    }
}
module.exports.createBlog = createBlog

const getBlog = async function (req, res) {
    try {

        let data = req.query
        data.isDeleted = false
        data.isPublished = true

        console.log(data)

        let saveData = await blogModel.find(data)

        if (saveData.length === 0) return res.status(404).send({ status: false, msg: "Blog Not Found" })
        res.status(200).send({ Status: true, msg: saveData })

    }
    catch (error) {
        console.log(error.massage)
        res.status(500).send({ error: error.massage, msg: "Server error" })
    }
}
module.exports.getBlog = getBlog