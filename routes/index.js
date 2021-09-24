const router = require('express').Router();
const room = require('./room');
const calendar = require('./calendar');
const meeting = require('./meeting');
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
router.use('/rooms', room);
router.use('/calendar', calendar);
router.use('/meetings', meeting);
module.exports = router;
