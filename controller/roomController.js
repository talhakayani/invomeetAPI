const { Room } = require('../models');
exports.getPost = (req, res, _next) => {
  return res.status(200).json({ status: 200, message: 'Server is connected' });
};

exports.addRoom = async (req, res, _next) => {
  try {
    const body = req.body;
    if (!body) throw new Error('Please provide the body');
    const result = await Room.create(body);
    if (!result) throw new Error('Unable to create user');
    return res
      .status(200)
      .json({ status: 200, message: 'user created', result });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getAvailableRooms = async (req, res, _next) => {
  try {
    const query = {
      where: {
        status: 'available',
      },
    };
    const rooms = await Room.findAll(query);
    if (!rooms.length) throw new Error('No room available');
    return res.status(200).json({ status: 200, message: 'Rooms found', rooms });
  } catch (err) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

exports.getAllRooms = async (req, res, _next) => {
  try {
    const rooms = await Room.findAll();
    if (!rooms.length) throw new Error('No rooms found');
    return res.status(200).json({ status: 200, message: 'Rooms found', rooms });
  } catch (err) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

exports.getRoomsByFloor = async (req, res, _next) => {
  try {
    const floor = req.params.floor;
    if (!floor) throw new Error('Please spacify the room location in the path');
    const rooms = await Room.findAll({
      where: {
        location: floor,
      },
    });
    if (!rooms.length) throw new Error('No meeting room found on this floor');
    return res.status(200).json({ status: 200, message: 'Rooms found', rooms });
  } catch (err) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

exports.getRoomById = async (req, res, _next) => {
  try {
    const id = req.params.id;
    if (!id) _next();
    const room = await Room.findOne({
      where: {
        id: id,
      },
    });
    if (!room) throw new Error('No room found');
    return res.status(200).json({ status: 200, message: 'Room found', room });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getRoomByName = async (req, res, _next) => {
  try {
    const name = req.params.name;
    if (!name) throw new Error('Please provide the room id/name');
    const room = await Room.findOne({
      where: {
        name: name,
      },
    });
    if (!room) throw new Error('No room found');
    return res.status(200).json({ status: 200, message: 'Room found', room });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.updateRoomStatus = async (req, res, _next) => {
  try {
    const name = req.params.name;
    const { status, reservedBy, reservedWith, reservedFrom } = req.body;
    if (!status) throw new Error('Please attach the body');
    const result = await Room.update(
      { status, reservedBy, reservedWith, reservedFrom },
      {
        where: {
          name: name,
        },
      }
    );
    console.log(result);
    if (!result) throw new Error('Unable to update the record');
    return res.status(200).json({ status: 200, message: 'data updated' });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
