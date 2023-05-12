const router = require('express').Router();
const { User, Character } = require('../models');

// Home route
router.get('/', async (req, res) => {
  try {
    const CharacterData = await Character.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const Characters = CharacterData.map((Character) => Character.get({ plain: true }));

    res.render('homepage', {
      Characters,
      loggedIn: req.session.loggedIn || false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Sign-up route (GET)
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// Sign-up route (POST)
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json({ message: 'Signup successful' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;