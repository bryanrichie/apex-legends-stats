import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.use('/profile/origin/:platformUserIdentifier', async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const data = await axios.get(
      `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${req.params.platformUserIdentifier}`,
      {
        headers: {
          'TRN-Api-Key': '4553072e-9b26-4fa0-a88e-33c09be933e8',
        },
      }
    );
    return res.status(200).send(data.data);
  } catch (error) {
    console.log('Error', error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
