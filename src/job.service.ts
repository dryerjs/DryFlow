import { db } from './db';

export interface Job {
  id: number;
  input: any;
  progress: number;
  status: string;
  createdAt: string;
}

class JobService {
  create(input: any): Promise<Job> {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO job (input, progress, status) VALUES (?, ?, ?)',
        [JSON.stringify(input), 0, 'pending'],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID } as any);
          }
        }
      );
    });
  }

  getAll(): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM job', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Job[]);
        }
      });
    });
  }

  get(id: number): Promise<Job | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM job WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as Job);
        }
      });
    });
  }

  update(input: Partial<Job>): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE job SET progress = ?, status = ? WHERE id = ?',
        [input.progress, input.status, input.id],
        err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  paginate(page: number, limit: number): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM job LIMIT ? OFFSET ?',
        [limit, (page - 1) * limit],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows as Job[]);
          }
        }
      );
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM job WHERE id = ?', [id], err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private async getLatestJobByStatus(status: string): Promise<Job | null> {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM job WHERE status = ? ORDER BY createdAt DESC LIMIT 1',
        [status],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve((row || null) as any);
          }
        }
      );
    });
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
