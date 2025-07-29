'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from '@/Components/Dahsboard/Employe/Liste_employe/SearchInput';
import styles from './Liste_produit.module.css';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Pagination,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useProducts } from '@/hooks/useProducts';
import { useTranslation } from 'react-i18next';

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
  width = 120,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) return;
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
        <Button
          sx={{
            backgroundColor: '#1976D2',
            color: 'white',
            justifyContent: 'flex-start',
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
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
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
  const router = useRouter();
  const { i18n } = useTranslation();
  const { products, loading, error, refetch } = useProducts();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleUpdate = (id: number) => {
    router.push(`/Dashboard/Ecommerce/${id}`);
  };

  const openDeleteConfirm = (id: number) => {
    setProductToDelete(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (
    event: React.SyntheticEvent<any, Event>,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (isDeleting) return;
    if (reason === 'backdropClick') return;
    setOpenConfirm(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    if (productToDelete === null) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${productToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erreur suppression produit');
      await refetch();
      setOpenConfirm(false);
      setProductToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublish = async (id: number) => {
    console.info('Publish product', id);
    await refetch();
  };

  const handleUnpublish = async (id: number) => {
    console.info('Unpublish product', id);
    await refetch();
  };

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .map((row) => {
      const isPublished = (row as any).isPublished ?? true;
      return {
        id: row.id,
        image: row.image1 !== null ? `/${row.image1}` : '/img/no-image.png',
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
    textAlign: 'left',
  };

  return (
    <div className={styles.card}>
              <h3 className={styles.titre_header}>All Products</h3>
    <div className={styles.header_prod}>        
      <div className={styles.topBar}>
        <FormControl size="small" sx={{ minWidth: 120, ml: 2 ,marginTop:'15px'}}>
          <InputLabel>Langue</InputLabel>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            label="Langue"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
            <MenuItem value="tr">Türkçe</MenuItem>
          </Select>
        </FormControl>
      </div>

      <header className={styles.header}>
        <SearchInput value={search} onChange={setSearch} />
      </header>
    </div>
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
                  <th style={cellStyle}><input type="checkbox" /></th>
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
                    <td style={cellStyle}><input type="checkbox" /></td>
                    <td style={cellStyle}>
                      <img src={prod.image} alt={prod.nom} className={styles.productImage} />
                    </td>
                    <td className={styles.productName} style={cellStyle}>{prod.nom}</td>
                    <td className={styles.productPrice} style={cellStyle}>${prod.prix.toFixed(2)}</td>
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
                          {
                            label: 'Publish',
                            onClick: () => handlePublish(prod.id),
                            disabled: prod.statut === 'Publish',
                          },
                          {
                            label: 'Unpublish',
                            onClick: () => handleUnpublish(prod.id),
                            disabled: prod.statut !== 'Publish',
                          },
                          {
                            label: 'Delete product',
                            onClick: () => openDeleteConfirm(prod.id),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={isDeleting}
      >
        <DialogTitle id="alert-dialog-title" dir="rtl" style={{ textAlign: 'right' }} className={styles.arabica}>
          {"تأكيد الحذف"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" dir="rtl" style={{ textAlign: 'right' }} className={styles.arabica2}>
            هل أنت متأكد من رغبتك في حذف هذا المنتج؟ هذا الإجراء لا رجعة فيه.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          <Button
            className={styles.arabica2}
            onClick={() => {
              if (!isDeleting) {
                setOpenConfirm(false);
                setProductToDelete(null);
              }
            }}
            disabled={isDeleting}
            dir="rtl"
          >
            إلغاء
          </Button>
          <Button
            className={styles.arabica2}
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            dir="rtl"
          >
            {isDeleting ? 'جاري الحذف...' : 'حذف'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Liste_produit;
