import express from 'express';
import cors from 'cors';
import { prepare } from './db';
import { router as jobRouter } from './job.router';

prepare();
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/v1/jobs', jobRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
