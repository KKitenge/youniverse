const router = require('express').Router();
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Set user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json({ message: 'Login successful' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;