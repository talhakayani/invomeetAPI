const router = require('express').Router();
const room = require('./room');
const calendar = require('./calendar');
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
router.use('/rooms', room);
router.use('/calendar', calendar);
module.exports = router;
