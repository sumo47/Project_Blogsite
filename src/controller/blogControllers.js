const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const { isValid } = require("../validator/validations")

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
    } catch (error) {
        res.status(500).send({ staus: false, message: err.message })
    }
}

const getBlog = async function (req, res) {
    try {

        let data = req.query
        data.isDeleted = false  //mst cheez h
        data.isPublished = true

        // console.log(data)

        let saveData = await blogModel.find(data)
        if (saveData.length === 0) return res.status(404).send({ status: false, msg: "Blog Not Found" })
        res.status(200).send({ Status: true, msg: saveData })

    }
    catch (error) {
        console.log(error.massage)
        res.status(500).send({ error: error.massage, msg: "Server error" })
    }
}


const updateBlog = async function (req, res) {
    try {

        let data = req.body
        let { title, body, tags, subcategory } = data
        let id = req.params.blogId

        if (id.length < 24) return res.status(400).send({ status: false, msg: "You have Entered wrong ID" })

        if (!title) return res.status(400).send({ status: false, msg: "Title is missing" })

        if (!body) return res.status(400).send({ status: false, msg: "body is missing" })

        if (!tags) return res.status(400).send({ status: false, msg: "tags is missing" })

        if (!subcategory) return res.status(400).send({ status: false, msg: "subcatagory is missing" })

        let checkBlogsId = await blogModel.findById(id)
        if (!checkBlogsId) return res.status(400).send({ status: false, msg: "It's not a valid Blog-ID" })

        let saveData = await blogModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true })
        

        res.send({ status : true,msg: saveData})



    } catch (err) {
        res.status(500).send({ mst: err.massage })
    }
}

let deleteById = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!blogId) return res.status(400).send({ status: false, msg: "please enter blogId " });

        let findBlogId = await blogModel.findOne({ _id: blogId, isDeleted: false });
        if (!findBlogId) return res.status(404).send({ status: false, msg: "Blog  not found" });



        let date = new Date();

        let deletedData = await blogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: date } },
            { new: true }
        );

        res.status(200).send()
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};



const deleteBlogByquery = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length == 0) return res.status(404).send({ status: false, Error: "data is required in query params" })


        let savedData = await blogModel.findOne(data, { isDeleted: false })
        if (!savedData) return res.status(404).send({ status: false, Error: "No Blog Found" })
        let date = new Date()
        savedData.isDeleted = true;
        savedData.deletedAt = date

        await savedData.save()

        res.status(200).send({ status: false, Msg: "data is deleted" })


    } catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}
 

module.exports.deleteById = deleteById;
module.exports.deleteBlogByquery = deleteBlogByquery;
module.exports.updateBlog = updateBlog
module.exports.createBlog = createBlog
module.exports.getBlog = getBlog