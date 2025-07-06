"use client";

import React from "react";
import Link from "next/link";
import SearchInput from "@/Components/Dahsboard/Employe/Liste_employe/SearchInput";
import styles from "./Liste_produit.module.css";
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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Produit {
  id: number;
  image: string;
  nom: string;
  prix: number;
  statut: string;
  type: string;
  itemType: string;
}

const produits: Produit[] = [
  {
    id: 1,
    image: "/img/Product/exemple.jpg",
    nom: "New French Elegant White Bubble Sleeve Party Dress Casual A-Line Dresses, Long Sleeve Dresses",
    prix: 334.83,
    statut: "Publish",
    type: "Best",
    itemType: "Normal",
  },
  {
    id: 2,
    image: "/img/Product/Exemple2.jpg",
    nom: "BREYLEE facial mask hyaluronic acid facial firming mask beauty",
    prix: 1352.81,
    statut: "Publish",
    type: "Feature",
    itemType: "Normal",
  },
  {
    id: 3,
    image: "/img/Product/Exemple3.jpg",
    nom: "Home Use Beauty Device Face Massager Facial Lifting Tool Beauty Anti-Aging",
    prix: 1352.81,
    statut: "Publish",
    type: "New",
    itemType: "Normal",
  },
  {
    id: 4,
    image: "/img/Product/Exemple4.jpg",
    nom: "Latex free makeup sponge Customized beauty make up blender makeup spong",
    prix: 1352.81,
    statut: "Publish",
    type: "Best",
    itemType: "Normal",
  },
  {
    id: 5,
    image: "/img/Product/exemple.jpg",
    nom: "Beauty Beauty Anti-wrinkle USB Charging Neck Wrinkle Removal Neck Care",
    prix: 1352.81,
    statut: "Publish",
    type: "New",
    itemType: "Normal",
  },
  {
    id: 6,
    image: "/img/Product/Exemple3.jpg",
    nom: "Home Use Beauty Device Face Massager Facial Lifting Tool Beauty Anti-Aging",
    prix: 1352.81,
    statut: "Publish",
    type: "New",
    itemType: "Normal",
  },
  {
    id: 7,
    image: "/img/Product/Exemple4.jpg",
    nom: "Latex free makeup sponge Customized beauty make up blender makeup spong",
    prix: 1352.81,
    statut: "Publish",
    type: "Best",
    itemType: "Normal",
  },
  {
    id: 8,
    image: "/img/Product/exemple.jpg",
    nom: "Beauty Beauty Anti-wrinkle USB Charging Neck Wrinkle Removal Neck Care",
    prix: 1352.81,
    statut: "Publish",
    type: "New",
    itemType: "Normal",
  },
];

interface MenuAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface SplitButtonProps {
  mainLabel: string;
  onMainClick: () => void;
  menu: MenuAction[];
}

const SplitButton: React.FC<SplitButtonProps> = ({
  mainLabel,
  onMainClick,
  menu,
}) => {
  const [open, setOpen] = React.useState(false);
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
        sx={{ backgroundColor: "#1976D2" }}
      >
        <Button sx={{ backgroundColor: "#1976D2", color: "white" }} onClick={onMainClick}>
          {mainLabel}
        </Button>
        <Button
          sx={{ backgroundColor: "#1976D2", color: "white" }}
          size="small"
          aria-haspopup="menu"
          aria-label="open actions menu"
          aria-expanded={open ? "true" : undefined}
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
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
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
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const handleEdit = (id: number) => {
    console.info("Option sur le produit", id);
  };

  const handleDelete = (id: number) => {
    console.info("Supprimer le produit", id);
  };

  const cellStyle: React.CSSProperties = {
    borderRight: "1px solid #dedede",
  };

  const filteredProducts = produits.filter((prod) =>
    prod.nom.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.card}>
       <h3 className={styles.titre_header}>
       All Products
      </h3>
      <header className={styles.header}>

        <SearchInput value={search} onChange={setSearch} />
      </header>

      <div className={styles.productTableWrapper}>
        <table
          className={styles.productTable}
          style={{ border: "1px solid #dedede", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={cellStyle}><input type="checkbox" /></th>
              <th style={cellStyle}>Image</th>
              <th style={cellStyle}>Nom</th>
              <th style={cellStyle}>Prix</th>
              <th style={cellStyle}>Statut</th>
              <th style={cellStyle}>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: "1px solid #dedede" }}>
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
                <td className={styles.productActions}>
                  <SplitButton
                    mainLabel="Option"
                    onMainClick={() => handleEdit(prod.id)}
                    menu={[{ label: "Supprimer", onClick: () => handleDelete(prod.id) }]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION MUI */}
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
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "white",
              borderColor: "#1976d2",
            },
          }}
        />

      </div>
    </div>
  );
};

export default Liste_produit;
