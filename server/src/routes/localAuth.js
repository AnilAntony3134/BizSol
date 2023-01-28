import { Router } from 'express';
import Joi from 'joi';
import faker from 'faker';

import User from '../models/User';
import requireLocalAuth from '../middleware/requireLocalAuth';
import { registerSchema } from '../services/validators';

const images = [
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 01.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 02.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 03.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 04.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 05.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 06.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 07.png",
  "/assets/Netflix Avatars/3Below Tales of Arcadia/3Below Tales of Arcadia 08.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 01.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 02.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 03.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 04.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 05.png",
  "/assets/Netflix Avatars/Lost in Space/Lost in Space 06.png",
]

const router = Router();

router.post('/login', requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  console.log(me);
  me.organisation = req.user.organisation;
  res.json({ token, me });
});

router.post('/register', async (req, res, next) => {
  const { error } = Joi.validate(req.body, registerSchema);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { email, password, name, username, organisation, role='USER' } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        username,
        name,
        organisation,
        role,
        avatar: images[Math.floor(Math.random() * 14)],
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ message: 'Register success.' }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
