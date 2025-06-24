'use client';

import { useRouter } from 'next/navigation';
import { Pagination, Box } from '@mui/material';

type Props = {
  count: number;
  page: number;
};

export default function PaginationClient({ count, page }: Props) {
  const router = useRouter();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/?page=${value}`); // navigation client-side fluide
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}
