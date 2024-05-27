const building = require('../schema/buildingModel');
const Building = require('../schema/buildingModel');
const tenat = require('../schema/tenatModel')

const registerTenate = async (req, res) => {
    try {


        const { username, email, phone, address, orgnisation, dateofjoining, rent, addhar, roomNo, buildingId, advanceRent } = req.body;
        console.log(req.body)
        let dateObj = new Date(dateofjoining);
        dateObj.setMonth(dateObj.getMonth() + 1);
        dateObj.setDate(1);
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day = String(dateObj.getDate()).padStart(2, "0");
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
        const selectedRooms = roomNo
        const building = await Building.findById(buildingId);
        const formattedSelectedRooms = Array.isArray(selectedRooms) ? selectedRooms : [selectedRooms];
        building.completedRoom.push(...formattedSelectedRooms);
        building.rooms = building.rooms.filter(room => !formattedSelectedRooms.includes(room));
        await building.save();
        res.status(200).json({
            message: 'Rooms selected successfully',
            data: building
        });
    } catch (error) {
        console.log(error)
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
            return res.status(400).send({ message: "Please enter the id" });
        }

        // Find the tenant by ID
        const deleteuser = await tenat.findById(tenatId);
        if (!deleteuser) {
            return res.status(404).send({ message: "Tenant not found" });
        }

        const roomNo = deleteuser.roomNo;
        const buildingId = deleteuser.buildingId;

        // Find the building by the tenant's building ID
        const updateBuildings = await Building.findById(buildingId);
        console.log(updateBuildings, 'this is the value of the building before the value changes')
        if (!updateBuildings) {
            return res.status(404).send({ message: "Building not found" });
        }

        // Check if the room is in completedRoom array and remove it
        const completedRoomIndex = updateBuildings.completedRoom.indexOf(roomNo);
        if (completedRoomIndex > -1) {
            updateBuildings.completedRoom.splice(completedRoomIndex, 1);
        }

        // Add the room to the rooms array if it's not already there
        if (!updateBuildings.rooms.includes(roomNo)) {
            updateBuildings.rooms.push(roomNo);
        }

        // Save the updated building
        const data = await updateBuildings.save();
        console.log(data, 'after the logic is applied this is the fina; value')

        // Delete the tenant
        await tenat.findByIdAndDelete(tenatId);

        res.status(200).send({ message: "Deleted successfully..." });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


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