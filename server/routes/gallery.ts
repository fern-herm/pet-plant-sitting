const {
  User,
  PetPlant,
  Job,
  Gallery,
  GalleryEntry,
} = require('../../database/index');
import express, { Request, Response } from 'express';
const gallery = express();

gallery.get('/all', async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findAll({ include: GalleryEntry });
    return res.status(200).send(gallery);
  } catch (err) {
    return res.sendStatus(418);
  }
});

gallery.post('/:user_id', async (req: Request, res: Response) => {
  //  console.log(gallery[0].id);
  // const gallery = await Gallery.findOrCreate({
  //   where: {
  //     user_id: req.params.user_id,
  //   },
  // });
  const user = await User.findByPk(req.params.user_id);
  const gal = await user.getGallery();
  if (gal === null) {
    user.createGallery({ user_id: user.id }).then((results: any) => {
      return res.status(200).send({ id: results.id });
    });
  } else {
    return res.sendStatus(200);
  }
  // return res.status(200).send(gallery);
});

gallery.post('/entry/:gallery_id', async (req: Request, res: Response) => {
  try {
    const gallery = await GalleryEntry.create(req.body);
    return res.status(200).send(gallery);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
});

gallery.delete('/entry/:gallery_id', async (req: Request, res: Response) => {
  try {
    GalleryEntry.destroy({
      where: {
        id: req.params.gallery_id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err, 'delete petplant err');
    res.sendStatus(404);
  }
});

module.exports = gallery;
