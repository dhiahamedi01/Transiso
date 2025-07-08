'use client';

import React, { useState } from 'react';
import SearchInput from '@/Components/Dahsboard/Employe/Liste_employe/SearchInput';
import styles from './Liste_produit.module.css';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Pagination,
  CircularProgress,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useProducts } from '@/hooks/useProducts';

interface MenuAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface SplitButtonProps {
  mainLabel: string;
  onMainClick: () => void;
  menu: MenuAction[];
  width?: number | string;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  mainLabel,
  onMainClick,
  menu,
  width = 120, // default width so text can align left nicely
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (
    event: Event | React.SyntheticEvent
  ) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as Node)
    )
      return;
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        size="small"
        ref={anchorRef}
        aria-label="split button"
        sx={{ backgroundColor: '#1976D2', width }}
      >
        {/* Main button: left‑aligned text */}
        <Button
          sx={{
            backgroundColor: '#1976D2',
            color: 'white',
            justifyContent: 'flex-start', // <-- left align the label
            textTransform: 'none',
            flex: 1,
            pl: 1.5,
          }}
          onClick={onMainClick}
        >
          {mainLabel}
        </Button>
        <Button
          sx={{ backgroundColor: '#1976D2', color: 'white', minWidth: 34 }}
          size="small"
          aria-haspopup="menu"
          aria-label="open actions menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
        sx={{ zIndex: 1500 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {menu.map((action) => (
                    <MenuItem
                      key={action.label}
                      disabled={action.disabled}
                      onClick={(event) => {
                        action.onClick();
                        handleClose(event);
                      }}
                    >
                      {action.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const Liste_produit: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Event handlers ---
  const handleUpdate = (id: number) => {
    console.info('Update product', id);
  };

  const handleDelete = async (id: number) => {
    console.info('Delete product', id);
    await refetch();
  };

  const handlePublish = async (id: number) => {
    console.info('Publish product', id);
    await refetch();
  };

  const handleUnpublish = async (id: number) => {
    console.info('Unpublish product', id);
    await refetch();
  };

  // --- Filtering + mapping ---
  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((row) => {
      const isPublished = (row as any).isPublished ?? true;
      return {
        id: row.id,
        image:
          row.image1 !== null ? `/${row.image1}` : '/img/no-image.png',
        nom: row.name,
        prix: Number(row.price),
        statut: isPublished ? 'Publish' : 'Draft',
        itemType: row.category,
      };
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const cellStyle: React.CSSProperties = {
    borderRight: '1px solid #dedede',
    textAlign: 'left', // ensure all cells left aligned
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.titre_header}>All Products</h3>
      <header className={styles.header}>
        <SearchInput value={search} onChange={setSearch} />
      </header>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <CircularProgress />
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div className={styles.productTableWrapper}>
            <table
              className={styles.productTable}
              style={{ border: '1px solid #dedede', borderCollapse: 'collapse' }}
            >
              <thead>
                <tr>
                  <th style={cellStyle}>
                    <input type="checkbox" />
                  </th>
                  <th style={cellStyle}>Image</th>
                  <th style={cellStyle}>Nom</th>
                  <th style={cellStyle}>Prix</th>
                  <th style={cellStyle}>Statut</th>
                  <th style={cellStyle}>Catégorie</th>
                  <th style={cellStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #dedede' }}>
                    <td style={cellStyle}>
                      <input type="checkbox" />
                    </td>
                    <td style={cellStyle}>
                      <img src={prod.image} alt={prod.nom} className={styles.productImage} />
                    </td>
                    <td className={styles.productName} style={cellStyle}>
                      {prod.nom}
                    </td>
                    <td className={styles.productPrice} style={cellStyle}>
                      ${prod.prix.toFixed(2)}
                    </td>
                    <td style={cellStyle}>
                      <button className={styles.productStatus}>{prod.statut}</button>
                    </td>
                    <td style={cellStyle}>{prod.itemType}</td>
                    <td className={styles.productActions} style={{ textAlign: 'left' }}>
                      <SplitButton
                        mainLabel="Actions"
                        onMainClick={() => handleUpdate(prod.id)}
                        menu={[
                          { label: 'Update product', onClick: () => handleUpdate(prod.id) },
                          { label: 'Publish', onClick: () => handlePublish(prod.id), disabled: prod.statut === 'Publish' },
                          { label: 'Unpublish', onClick: () => handleUnpublish(prod.id), disabled: prod.statut !== 'Publish' },
                          { label: 'Delete product', onClick: () => handleDelete(prod.id) },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              variant="outlined"
              color="primary"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderColor: '#1976d2',
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Liste_produit;
