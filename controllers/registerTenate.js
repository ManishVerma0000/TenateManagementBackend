const tenat = require('../schema/tenatModel')

const registerTenate = async (req, res) => {
    try {

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


const updateTenate = async (req, res) => {
    try {

        const _id = req.params.id;
        var userdetails;
        if (!_id) {
            await res.status(400).send({ message: "Please provide the id for the update" })
        }
        else {
            userdetails = tenat.findById(_id);


        }

        const updateObject = {}
        const { username, email, phone, address, orgnisation, buildingno, dateofjoining, rent } = req.body;
        if (username) {
            updateObject['username'] = username
        } else {
            updateObject['username'] = userdetails['username']
        }

        if (email) {
            updateObject['email'] = email
        }
        else {
            updateObject['email'] = userdetails['email']
        }

        if (phone) {
            updateObject['phone'] = phone
        }
        else {
            updateObject['phone'] = userdetails['phone']
        }
        if (address) {
            updateObject['address'] = address
        }
        else {
            updateObject['address'] = userdetails['address']
        }

        if (orgnisation) {
            updateObject['orgnisation'] = orgnisation
        }
        else {
            updateObject['orgnisation'] = userdetails['orgnisation']
        }
        if (buildingno) {
            updateObject['buildingno'] = buildingno
        } else {
            updateObject['buildingno'] = userdetails['buildingno']
        }
        if (dateofjoining) {
            updateObject['dateofjoining'] = dateofjoining
        } else {
            updateObject['dateofjoining'] = userdetails['dateofjoining']
        }
        if (rent) {
            updateObject['rent'] = rent
        } else {
            updateObject['rent'] = userdetails['rent']
        }

        const updaateDb = await tenat.findByIdAndUpdate(_id, updateObject)
        await res.status(200).send(updaateDb)

    } catch (error) {

        await res.status(400).send(error.message)
    }
}



module.exports = registerTenate