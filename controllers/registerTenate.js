const tenat = require('../schema/tenatModel')

const registerTenate = async (req, res) => {
    try {

        console.log(req.body)
        const { username, email, phone, address, orgnisation, dateofjoining, rent, addhar, roomNo, buildingId } = req.body;
        let dateObj = new Date(dateofjoining);
        dateObj.setMonth(dateObj.getMonth() + 1);

        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 since getMonth returns 0-indexed month
        let day = String(dateObj.getDate()).padStart(2, "0");

        // Concatenate the formatted parts
        let formattedDate = `${year}-${month}-${day}`;

        const savedb = await tenat.create({
            dateofjoining: dateofjoining,
            username: username,
            email: email,
            phone: phone,
            addhar: addhar,
            address: address,
            orgnisation: orgnisation,
            rent: rent, roomNo: roomNo,
            buildingId: buildingId,
            NextInstallement: formattedDate,
            advanceRent: advanceRent
        });
        console.log(savedb, 'this is the value in the db')
        await res.status(200).send({ message: "created", data: savedb })
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



const tenateProfile = async (req, res) => {
    try {

        const _id = req.query.id;
        const tenatedetails = await tenat.findById(_id)
        await res.status(200).send(tenatedetails)
    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const deleteTenateProfile = async (req, res) => {
    try {

        const tenatId = req.query.id;
        if (!tenatId) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            // const deleteuser = await tenat.findByIdAndDelete({ _id: tenatId })
            await res.status(200).send({ message: "delted successfully..." })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

const Tenateprofile = async (req, res) => {
    try {

        const tenatId = req.query.id;
        if (!tenatId) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const tenateDeatils = await tenat.findById(tenatId)
            // const deleteuser = await tenat.findByIdAndDelete({ _id: tenatId })
            await res.status(200).send({ message: "updated successfullly", data: tenateDeatils })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


module.exports = { registerTenate, updateTenate, tenateProfile, deleteTenateProfile, Tenateprofile }