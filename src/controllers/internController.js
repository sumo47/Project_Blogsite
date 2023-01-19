const collegeModel = require("../models/collegeModel.js");
const internModel = require("../models/internModel.js");
const validator = require("../validator/validator.js");

// <----------------------------Post Api--------------------------------->
// ---------------This Api is used for Create Intern---------------------

const createInterns = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "no content in the document, please provide intern details" })
        }
        else {
            const { name, email, mobile, collegeName } = req.body 

            if(!name) return res.status(400).send({status:false, msg:"Please Provide Name"})
            if(!email) return res.status(400).send({status:false, msg:"Please Provide email"})
            if(!mobile) return res.status(400).send({status:false, msg:"Please Provide mobile"})
            if(!collegeName) return res.status(400).send({status:false, msg:"Please Provide collegeName"})
            
                if (!(validator.isValidName(name) && validator.isValid(name))) {
                    return res.status(400).send({ status: false, message: "please provide your valid name" })


                }
                if (!(validator.isValidEmail(email) && validator.isValid(email))) {
                    return res.status(400).send({ status: false, message: "please provide your valid email" })
                }

                const checkEmail = await internModel.findOne({ email: email.trim()})
                if (checkEmail) {
                    return res.status(400).send({ status: false, message: `This email: ${email.trim()} is already in used for intern` })
                }

                if (!(validator.isValidNumber(mobile) && validator.isValid(mobile))) {
                    return res.status(400).send({ status: false, message: "please provide your valid Number with 91, Number size should be of 10" })
                }

                const checkMobile = await internModel.findOne({ mobile: mobile })
                if (checkMobile) {
                    return res.status(400).send({ status: false, message: `This number: ${mobile} is already in used for intern` })
                }

                if (!(validator.isValidcollegeName(collegeName) && validator.isValid(collegeName))) {
                    return res.status(400).send({ status: false, message: "please provide your valid college Name" })
                }
                
                const checkCollege = await collegeModel.findOne({ name: collegeName.trim()})
                if (checkCollege) {

                    const createIntern = await internModel.create({ name: name.trim(), email: email.trim(), mobile: mobile, collegeId: checkCollege._id })
                    return res.status(201).send({ status: true, data: createIntern })
                }
                else {
                    return res.status(404).send({ status: false, message: "college is not present" })
                }
            
        }
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createInterns = createInterns;
