/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from "qr-image";
import fs, { writeFile } from "fs"
import { time } from 'console';

inquirer
  .prompt([
    {
        "message": "Type in your url",
        name:"URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const timestamp = Date.now();
    const qrFileName = `qr_img_${timestamp}.png`;



    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(qrFileName));

    fs.appendFile("URL.txt", url + "\n", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
