import { Job, jobService } from './job.service';

class Runner {
  private isRunning = false;

  public async run() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    await this.processJobs();
    this.isRunning = false;
  }

  private async processJobs() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const job = await jobService.getOnePendingJob();
      if (!job) return;
      await this.processOneJob(job);
    }
  }

  private async processOneJob(job: Job) {
    await jobService.update({ id: job.id, status: 'running' });
    for (let i = 0; i < 20; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await jobService.update({ id: job.id, progress: 5 * i });
    }
    await jobService.update({ id: job.id, status: 'completed' });
  }
}

export const runner = new Runner();
