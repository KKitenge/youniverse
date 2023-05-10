const router = require('express').Router();
const { Character, User } = require('../../models');


//Get all characters
router.get('/', async(req, res) => {
    try {
        const characterData = await Character.findAll();
        console.log(characterData);
        res.status(200).json(characterData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

//Get a single character
router.get('/:id', async (req, res) => {
    try {
        const characterData = await Character.findByPk(req.params.id, {
            include: [{ model: User }]
        });
        if (!characterData) {
            res.status(404).json({ message: 'No character found with this id :(' });
            return;
        }

        res.status(200).json(characterData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;