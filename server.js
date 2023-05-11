const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

// Routes
app.use(routes);

// Signup route
app.post('/api/users', async (req, res) => {
  try {
    // Perform necessary logic to create a new user using the req.body data
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Optionally, you can log the newly created user data
    console.log(newUser);

    // Respond with a success message or any necessary data
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // Handle any errors that occur during the signup process
    console.log(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});