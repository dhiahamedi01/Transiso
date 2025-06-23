'use client';

import { Pagination, Box } from '@mui/material';

type Props = {
  count: number;
  page: number;
};

export default function PaginationClient({ count, page }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => {
          // Redirection simple côté client
          window.location.href = `/?page=${value}`;
        }}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}
