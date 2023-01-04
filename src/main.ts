import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  //express code for the /image route handler
import * as express from 'express';

const app = express();
const fs = require('fs');
const sharp = require('sharp');

//image processsing route handler
app.get('/image', (req, res) => {
  //get selected image from query parameters
  const selectedImage = req.query.filename;

  //read from selected image from the image folder using the fs module
  fs.readFile(`./assets/images/${selectedImage}}`, (err, data) => {
    if (err) {
      res.status(500).send('Error reading image');
      return;
    }

    //use sharp to resize
    sharp(data)
      .resize(Number(req.query['width']), Number(req.query['height']))
      .toBuffer()
      .then((output) => {
        res.send(output);
      })
      .catch((error) => {
        res.status(500).send('error resizing image');
      });
  });
});


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));