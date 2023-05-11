const router = require('express').Router();
const { User } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id :(' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (userData[0] === 0) {
      res.status(404).json({ message: 'No user found with this id :(' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id :(' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;