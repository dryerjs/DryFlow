import { useSearchParams } from 'react-router-dom';
import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  File,
  RefreshCcw,
  Inbox,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useAxios from 'axios-hooks';

const LIMIT = 5;

export interface Job {
  id: number;
  input: any;
  progress: number;
  status: string;
  createdAt: string;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomPagination } from '@/components/custom-pagination';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface IPaginationResponse<T> {
  docs: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

const JobRow = ({
  job,
  deleteJob,
}: {
  job: Job;
  deleteJob: (job: Job) => void;
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{job.id}</TableCell>
      <TableCell>
        <Badge variant="outline">{job.status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{job.progress}</TableCell>
      <TableCell className="hidden md:table-cell">{job.createdAt}</TableCell>
      <TableCell className="hidden md:table-cell">
        2023-07-12 10:42 AM
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteJob(job)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const getUrl = (page: number, status: string) => {
  const searchParams = new URLSearchParams();
  searchParams.append('limit', LIMIT.toString());
  searchParams.append('page', page.toString());
  if (['in_progress', 'completed', 'archived'].includes(status)) {
    searchParams.append('statuses', status);
  }
  return `/jobs?${searchParams.toString()}`;
};

export const ListOfJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  const [{ data, loading, error }, refetch] = useAxios<
    IPaginationResponse<Job>
  >(getUrl(page, status));

  const [__, execute] = useAxios<Job[]>(
    { method: 'DELETE', url: 'placeholder' },
    { manual: true },
  );

  if (error) return <p>Error!</p>;

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' },
  ];

  const deleteJob = async (job: Job) => {
    await execute({ url: `jobs/${job.id}` });
    const newStatus = searchParams.get('status') || 'all';
    await refetch({ url: getUrl(page, newStatus) });
    setSearchParams({ page: page.toString(), status: newStatus });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue={status}>
        <div className="flex items-center">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => {
                  refetch({ url: getUrl(1, tab.value) });
                  setSearchParams({ status: tab.value, page: '1' });
                }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={() => refetch()}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Job
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value={status}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
              <CardDescription>
                Manage your Jobs and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!loading &&
                    data!.docs.map((job) => (
                      <JobRow job={job} key={job.id} deleteJob={deleteJob} />
                    ))}
                </TableBody>
              </Table>
              {loading && <LoadingSpinner className="mx-auto mt-4" />}
            </CardContent>
            {!loading && (
              <CardFooter>
                <CustomPagination
                  total={data!.meta.total}
                  totalPages={Math.ceil(data!.meta.total / data!.meta.limit)}
                  limit={data!.meta.limit}
                  page={data!.meta.page}
                  setPage={async (page: number) => {
                    const newStatus = searchParams.get('status') || 'all';
                    await refetch({ url: getUrl(page, newStatus) });
                    setSearchParams({
                      page: page.toString(),
                      status: newStatus,
                    });
                  }}
                />
              </CardFooter>
            )}
            {!loading && data!.docs.length === 0 && (
              <CardFooter className="justify-center">
                <Inbox className="h-12 w-12 text-gray-400 block" />
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};
