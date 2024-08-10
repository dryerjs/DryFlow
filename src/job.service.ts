import { knex } from './db';

export interface Job {
  id: number;
  input: any;
  progress: number;
  status: string;
  createdAt: string;
}

class JobService {
  async create(input: any): Promise<Job> {
    const [id] = await knex('job')
      .insert({
        input: JSON.stringify(input),
        progress: 0,
        status: 'pending',
        createdAt: knex.fn.now(),
      })
      .returning('id');
    return { id } as Job;
  }

  async getAll(): Promise<Job[]> {
    const jobs = await knex('job').select('*');
    return jobs as Job[];
  }

  async get(id: number): Promise<Job | null> {
    return (await knex('job').where({ id }).first()) as Job | null;
  }

  async update(input: Partial<Job> & { id: number }): Promise<void> {
    await knex('job').where({ id: input.id }).update(input);
  }

  async paginate(page: number, limit: number): Promise<Job[]> {
    const jobs = await knex('job')
      .select('*')
      .limit(limit)
      .offset((page - 1) * limit);
    return jobs as Job[];
  }

  async delete(id: number): Promise<void> {
    await knex('job').where({ id }).del();
  }

  private async getLatestJobByStatus(status: string): Promise<Job | null> {
    const job: Job | null = await knex('job')
      .where({ status })
      .orderBy('createdAt', 'desc')
      .first();
    return job;
  }

  public async getOnePendingJob(): Promise<Job | null> {
    const runningJob = await this.getLatestJobByStatus('running');
    if (runningJob) {
      return runningJob;
    }
    const pendingJob = await this.getLatestJobByStatus('pending');
    return pendingJob;
  }
}

export const jobService = new JobService();
