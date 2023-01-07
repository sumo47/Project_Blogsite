// const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const validator = require("validator")
const {isValid} = require("../validation/validation")
const createAuthor = async function (req,res){
    try{
        let data = req.body
        let {fname,lname,title,email,password} = data
       // require mendatory 
        if (!isValid(fname)) return res.status(400).send({ status: false, message: "first-name is required" })

        if (!isValid(lname)) return res.status(400).send({ status: false, message: "last-name is required" })

        if (!isValid(title)) return res.status(400).send({ status: false, message: "title-Name is required" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is required" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "password is required" })

        if(!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "it's an invalid email address!" })


        let validFname = validator.isAlpha(fname);
        let validLname = validator.isAlpha(lname);
    
        if (validFname == false || validLname == false)
          return res.status(400).send({ status: false, msg: "LastName and firstName must be in alphabate", });
    


        let checkEmail = await authorModel.findOne({email: email})
        if (checkEmail) return res.status(400).send({status: false, message: "email is already exist"})

        const resultData = await authorModel.create(data)
        return res.status(201).send(resultData)
        
    }catch(err){
        res.status(500).send({staus: false , message :err.message})
    }
}

module.exports.createAuthor = createAuthor