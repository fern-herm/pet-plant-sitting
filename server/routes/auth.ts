
import express, { Request, Response } from 'express';
const passport = require('passport');
const bcrypt = require('bcryptjs');
const color = require('cli-color');
const auth = express();
require('dotenv').config();
const {
  User,
  PetPlant,
  Rating,
  Gallery,
  GalleryEntry,
} = require('../../database/index.ts');


const CLIENT_URL: string | undefined =
  process.env.CLIENT_URL === 'http://localhost'
    ? `${process.env.CLIENT_URL}` //remove for deployment?
    : process.env.CLIENT_URL;


auth.post('/local/register', async (req: any, res: any) => {
  //console.log(req.body, 'req.body in auth.post /local/register');
  const { name, username, password, location } = req?.body;
  try {
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      res.send('Improper Values');
      return;
    }
    // Check if user already exists
    const returningUser = await User.findOne({ where: { username } });
    if (returningUser) {
      res.send('User already exists');
      return;
    } else { 
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        username,
        password: hashedPassword,
        location,
      });
      console.table(user.name);
      res.status(200).json({
        message: 'success',
        success: true,
        user: user,
      });
    }    
  } catch (error) {
    console.error(error);  
    res.sendStatus(400);
  }
});
        
auth.post('/local/login', (req: any, res: any, next: any) => {
  //console.log(req.body, 'req.body in auth.post /local/login');
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login/fail',
    // failureMessage: true,
    // successMessage: true,
  }, (err: any, user: boolean, info: any, status: any) => {
    //console.log(color.xterm(122).bold('authenticate function', 'user', user ));
    // console.log('user', user ); //user
    if (err) { throw err; }
    if (!user) {
      res.send('Invalid Credentials'); 
    } else {
      req.logIn(user, (err: any) => {
        if (err) { throw err; }
        //console.log(color.xterm(11).bold(req.session.passport.user, '< - user on session cookie', req.user));
        res.send(user);
      });
    }
  })(req, res, next);
});

auth.get('/login/success', (req: Request | any, res: Response) => {
  //console.log(color.xterm(122).bold(req.user, 'req.user in auth.get /login/success'));

  // console.log(req.user, 'req.user in auth.get /login/success');
  if (req.user) {
    User.findOne({ where: { id: req.user.id || req.user[0].id }, 
      include: [{ model: PetPlant,
        include: [{ model: Rating,
          include: [{ model: User, attributes: ['name', 'image'], as: 'submitter' }],
        }],
      },
      { model: Rating,
        include: [{ model: User, attributes: ['name', 'image'], as: 'submitter' }],
      },
      { model: Gallery,
        include: [{ model: GalleryEntry }],
      }],
    }).then((user: object) => {
      //console.log(color.xterm(122).bold(user, 'user in auth.get /login/success'));

      // console.log(user, 'user in auth.get /login/success');
      res.status(200).json({
        message: 'success',
        success: true,
        user: user,
      });
    }).catch((error: string) => {
      console.error(error);
      res.sendStatus(400);
    });
  } else {
    //console.log('req.user undefined');
    res.sendStatus(400);
  }
});

auth.get('/login/fail', (req: Request, res: Response) => {
  res.sendStatus(400).redirect('/login');
});

auth.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

auth.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/loading',
  failureRedirect: '/login/fail',
}));

auth.get('/logout', (req: Request, res: Response) => {
  req.logOut(() => {
    res.redirect('/');
  });
});

module.exports = auth;
