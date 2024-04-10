const tenat = require('../schema/tenatModel')

const registerTenate = async (req, res) => {
    try {
        console.log(req.file, 'this is the value of the file')
        const { username, email, phone, address, orgnisation, buildingno, dateofjoining, rent } = req.body;
        console.log(req.body, 'this is the value of the body')
        const savedb = await tenat.create(req.body,
            {
                addhar: req.file.filename
            });
        console.log(savedb)
        await res.status(200).send({ message: "created", savedb })
        console.log(req.body)


    } catch (error) {
        await res.status(400).send(error.message)
    }
}

module.exports = registerTenate