const router = require('express').Router();
const { User, Character } = require('../models');

// Home route
router.get('/', async (req, res) => {
  try {
    //Get all characters and JOIN with user data
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
      loggedIn: req.session.loggedIn,
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



// Sign-up route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;