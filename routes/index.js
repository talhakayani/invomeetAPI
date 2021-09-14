const router = require('express').Router();
const room = require('./room');
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
router.use('/rooms', room);

module.exports = router;
