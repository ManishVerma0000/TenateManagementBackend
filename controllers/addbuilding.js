



const building = require('../schema/buildingModel');

const addbuilding = async (req, res) => {
    try {

        const { buildingname, room, location, caretaker } = req.body
        if (!buildingname || !room || !location || !caretaker) {
            await res.status(400).send('please enter the building')
        } else {
            console.log(req.body, 'this is the value of the body')

            const createBuilding = await building.create({
                buildingname,
                rooms: room || [],
                location,
                caretaker
            });


            await res.status(200).send(createBuilding)

        }

    } catch (error) {
        await res.status(400).send(error.message)
    }
}






const listofbuilding = async (req, res) => {
    try {
        const listofbuildingdata = await building.find({})
        await res.status(200).send(listofbuildingdata)

    } catch (error) {
        await res.status(400).send(error.message)

    }
}



const totalRoom = async (req, res) => {
    try {
        const buildingId = req.query.id;
        if (!buildingId) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const findBuilding = await building.findById({ _id: buildingId })
            await res.status(200).send({ message: "details", data: findBuilding })
        }


    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

const Building = require('../schema/buildingModel');



const findopenRoomsOfBuilding = async (req, res) => {
    try {
        const buildingId = req.query.id;
        if (!buildingId) {
            await res.status(400).send({ message: "Please select the building id" })
        } else {
            const buildingDetails = await building.findById({ _id: buildingId })
            await res.status(200).send(buildingDetails)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const updateRoom = async (req, res) => {

    try {
        const { buildingId, selectedRooms } = req.body;
        const building = await Building.findById(buildingId);
        const formattedSelectedRooms = Array.isArray(selectedRooms) ? selectedRooms : [selectedRooms];
        building.completedRoom.push(...formattedSelectedRooms);
        building.rooms = building.rooms.filter(room => !formattedSelectedRooms.includes(room));
        await building.save();
        res.status(200).json({
            message: 'Rooms selected successfully',
            data: building
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = { addbuilding, listofbuilding, totalRoom, updateRoom, findopenRoomsOfBuilding }