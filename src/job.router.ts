/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { jobService } from './job.service';
import { runner } from './runner';

export const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call

router.post('/', async (req, res) => {
  const input = req.body;
  const job = await jobService.create(input);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  runner.run();
  res.send(job);
});

const toArray = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return value.split(',');
  }
  return value;
};

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const job = await jobService.get(id);
  res.send(job);
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const statuses = toArray(req.query.statuses as any);
  const filter = { statuses };
  const jobs = await jobService.paginate(page, limit, filter);
  res.send(jobs);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await jobService.delete(id);
  res.send({ deleted: true });
});
