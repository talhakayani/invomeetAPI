const router = require('express').Router();
const room = require('./room.router');
const calendar = require('./calendar.router');
const meeting = require('./meeting.router');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.use('/rooms', room);
router.use('/calendar', calendar);
router.use('/meetings', meeting);
module.exports = router;
