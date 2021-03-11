import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.use('/search/:platform/:query', async (req: Request, res: Response) => {
  try {
    const users = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/search`, {
      headers: {
        'TRN-Api-Key': '4553072e-9b26-4fa0-a88e-33c09be933e8',
      },
      params: {
        platform: req.params.platform,
        query: req.params.query,
        autocomplete: true,
      },
    });

    return res.status(200).send(users.data);
  } catch (error) {
    console.log('Error', error);
    res.status(400).send(error);
  }
});

app.use('/profile/:platform/:username', async (req: Request, res: Response) => {
  try {
    const profile = await axios.get(
      `https://public-api.tracker.gg/v2/apex/standard/profile/${req.params.platform}/${req.params.username}`,
      {
        headers: {
          'TRN-Api-Key': '4553072e-9b26-4fa0-a88e-33c09be933e8',
        },
      }
    );

    return res.status(200).send(profile.data);
  } catch (error) {
    console.log('Error', error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
