const controller = require('../../controller/roomController');
const router = require('express').Router();
router.get('/', controller.getAllRooms);
router.post('/add', controller.addRoom);
router.get('/available', controller.getAvailableRooms);
router.get('/find/id/:id', controller.getRoomById);
router.get('/find/location/:floor', controller.getRoomsByFloor);
router.get('/find/name/:name', controller.getRoomByName);
module.exports = router;
