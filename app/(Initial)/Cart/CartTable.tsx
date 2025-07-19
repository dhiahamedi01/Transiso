"use client";

import React, { useEffect, useState } from "react";
import Style from "./Panier.module.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Add, Remove } from "@mui/icons-material";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartTable() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis localStorage au chargement du composant
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        const formattedCart = parsedCart.map((item: any) => ({
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity),
        }));
        setCartItems(formattedCart);
      } catch (e) {
        console.error("Erreur lors du parsing du panier localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans localStorage uniquement après le chargement initial
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getTotal = (item: CartItem) => item.price * item.quantity;

  return (
    <Box
      p={2}
      sx={{
        direction: "rtl",
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        overflowX: "auto",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", minWidth: 320 }}
      >
        <Table sx={{ borderCollapse: "collapse", minWidth: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f7f7f7" }}>
              <TableCell
                sx={{
                  border: "1px solid #ddd",
                  textAlign: "right",
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                }}
              >
                <Typography sx={{fontFamily: "'Noto Kufi Arabic', sans-serif"}} fontWeight={600}>اسم المنتج</Typography>
              </TableCell>
              <TableCell
                sx={{ border: "1px solid #ddd", textAlign: "right" }}
              >
                <Typography sx={{fontFamily: "'Noto Kufi Arabic', sans-serif"}} fontWeight={600}>سعر المنتج</Typography>
              </TableCell>
              <TableCell
                sx={{ border: "1px solid #ddd", textAlign: "center" }}
              >
                <Typography sx={{fontFamily: "'Noto Kufi Arabic', sans-serif"}} fontWeight={600}>الكمية</Typography>
              </TableCell>
              <TableCell
                sx={{ border: "1px solid #ddd", textAlign: "right" }}
              >
                <Typography sx={{fontFamily: "'Noto Kufi Arabic', sans-serif"}} fontWeight={600}>الإجمالي</Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd" }} align="center">
                <Button
                  onClick={handleClearCart}
                  variant="contained"
                  sx={{
                    backgroundColor: "#DE1E27",
                    textTransform: "none",
                    fontWeight: 400,
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                  }}
                >
                  تفريغ السلة
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography
                    fontWeight={500}
                    color="text.secondary"
                    fontFamily="'Noto Kufi Arabic', sans-serif"
                  >
                    سلة التسوق فارغة
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "right",
                    direction: "ltr",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        fontFamily="'Noto Kufi Arabic', sans-serif"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Avatar
                      src={item.image}
                      variant="square"
                      sx={{ width: 70, height: 70 }}
                      alt={item.name}
                    />
                  </Box>
                </TableCell>

                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "right",
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                  }}
                >
                  {item.price.toFixed(2)} د.ت
                </TableCell>

                <TableCell sx={{ border: "1px solid #ddd", textAlign: "center" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      border: "1px solid #ccc",
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      borderRadius: "20px",
                      width: 120,
                      backgroundColor: "#f9f9f9",
                      px: 1,
                      mx: "auto",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      sx={{ color: "#333" }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <Typography
                      mx={1}
                      fontWeight="bold"
                      fontFamily="'Noto Kufi Arabic', sans-serif"
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      sx={{ color: "#333" }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "right",
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                  }}
                >
                  {getTotal(item).toFixed(2)} د.ت
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                    sx={{ direction: "ltr" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
