const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./auth/passport.ts');

<<<<<<< HEAD
=======
const app = express();

//*****************************STATIC MIDDLEWARE***********************************/

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET, PUT, POST, PATCH, DELETE',
  credentials: true,
}));
app.use(express.static(CLIENT_PATH));

>>>>>>> 1efa79cab4adee5dc786ca9f5a174d104a7587d4
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser(process.env.SESSION_SECRET));
//**************************** PASSPORT INIT *********************************** */

app.use(passport.initialize());
app.use(passport.session());


//****************************** OTHER - ROUTES ******************************************* */
app.use('/auth', require('./routes/auth.ts'));
app.use('/api/map', require('./routes/map.ts'));
app.use('/api/events', require('./routes/events.ts'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/pets_plants', require('./routes/pets_plants'));
app.use('/conversations', require('./routes/conversations'));
app.use('/messages', require('./routes/messages'));
<<<<<<< HEAD

=======
app.use('/api/jobapplicants', require('./routes/jobApplicants'));
>>>>>>> 1efa79cab4adee5dc786ca9f5a174d104a7587d4
app.use('/api/info', require('./routes/info'));

app.get('/*', function (req: Request, res: Response | any) {
  res.sendFile(
    path.join(__dirname, '../client/build/index.html'),
    function (err: Error) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`🚀 Server is listening at ${process.env.CLIENT_URL}:${port}`);
});

db.authenticate()
  .then(() => console.log('✨ Connected to database'))
  .catch((err: string) => console.error(err));

export {};
