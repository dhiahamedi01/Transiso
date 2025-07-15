'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event as RBCEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// MUI imports
import { Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';

const localizer = momentLocalizer(moment);

type Order = {
  id: string;
  recipient: string;
  date: string; // format ISO yyyy-mm-dd
  address: string;
  products: string;
  status: string;
  paymentStatus: string;
  imageUrl: string;
};

interface CalendarEvent extends RBCEvent {
  resource: Order;
}

const orders: Order[] = [
  {
    id: '#ORD1001',
    recipient: 'Amine Chebbi',
    date: '2025-07-05',
    address: '123 Main Street, Tunis',
    products: 'Phone, Charger',
    status: 'Delivered',
    paymentStatus: 'Paid',
    imageUrl: '/img/Avatar/avatar-1.jpg',
  },
  {
    id: '#ORD1002',
    recipient: 'Mongi Merhi',
    date: '2025-07-07',
    address: '45 Avenue Habib Bourguiba, Sfax',
    products: 'Laptop, Mouse',
    status: 'In Transit',
    paymentStatus: 'Unpaid',
    imageUrl: '/img/Avatar/avatar-2.jpg',
  },
  {
    id: '#ORD1003',
    recipient: 'Karim Haddad',
    date: '2025-07-10',
    address: 'Route de la Marsa, La Marsa',
    products: 'Books, Pen',
    status: 'Delayed',
    paymentStatus: 'Paid',
    imageUrl: '/img/Avatar/avatar-3.jpg',
  },
  {
    id: '#ORD1004',
    recipient: 'Aymen Nasser',
    date: '2025-07-12',
    address: 'Centre ville, Ariana',
    products: 'Shoes, T-shirt',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
    imageUrl: '/img/Avatar/avatar-4.jpg',
  },
  {
    id: '#ORD1005',
    recipient: 'Hichem Dakhlaoui',
    date: '2025-07-15',
    address: 'Bardo, Tunis',
    products: 'Tablet, Stylus',
    status: 'Delivered',
    paymentStatus: 'Paid',
    imageUrl: '/img/Avatar/avatar-5.jpg',
  },
  {
    id: '#ORD1006',
    recipient: 'Rim Mansour',
    date: '2025-07-18',
    address: 'Rue El Khadra, Sousse',
    products: 'Camera, Tripod',
    status: 'In Transit',
    paymentStatus: 'Unpaid',
    imageUrl: '/img/Avatar/avatar-6.jpg',
  },
  {
    id: '#ORD1007',
    recipient: 'Nadia Fares',
    date: '2025-07-20',
    address: 'Sidi Bou Said',
    products: 'Headphones',
    status: 'Delivered',
    paymentStatus: 'Paid',
    imageUrl: '/img/Avatar/avatar-7.jpg',
  },
];

function parseDateISO(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const events: CalendarEvent[] = orders.map(order => ({
  title: order.recipient,
  start: parseDateISO(order.date),
  end: parseDateISO(order.date),
  allDay: true,
  resource: order,
}));

const EventComponent: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  const order = event.resource;
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <img
        src={order.imageUrl}
        alt={order.recipient}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 3px rgba(0,0,0,0.3)',
        }}
      />
      <Box>
        <Typography fontWeight={600} fontSize={12}>{order.id}</Typography>
        <Typography fontSize={10} color="text.secondary">{order.recipient}</Typography>
      </Box>
    </Box>
  );
};

const Modal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => (
  <Box
    onClick={onClose}
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      bgcolor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1300,
      p: 2,
    }}
  >
    <Box
      onClick={e => e.stopPropagation()}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        width: 450,
        maxWidth: '90vw',
        boxShadow: 24,
        p: 3,
        position: 'relative',
        textAlign: 'left',
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', top: 8, right: 8 }}
        size="large"
      >
        <CloseIcon />
      </IconButton>

      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <img
          src={order.imageUrl}
          alt={order.recipient}
          style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16, objectFit: 'cover' }}
        />
        <Typography variant="h5" component="h2" gutterBottom>{order.recipient}</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <InfoIcon color="primary" />
        <Typography><strong>Order ID:</strong> {order.id}</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <EventIcon color="action" />
        <Typography><strong>Date:</strong> {order.date}</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <HomeIcon color="action" />
        <Typography><strong>Address:</strong> {order.address}</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ShoppingCartIcon color="action" />
        <Typography><strong>Products:</strong> {order.products}</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <InfoIcon color={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'error' : 'warning'} />
        <Typography><strong>Status:</strong> {order.status}</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <PaymentIcon color={order.paymentStatus === 'Paid' ? 'success' : 'error'} />
        <Typography><strong>Payment:</strong> {order.paymentStatus}</Typography>
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" onClick={onClose} color="primary" startIcon={<CloseIcon />}>
          Close
        </Button>
      </Box>
    </Box>
  </Box>
);

const OrderCalendar: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = '#ccc';
    switch (event.resource.status) {
      case 'Delivered':
        backgroundColor = '#4ade80'; // vert
        break;
      case 'In Transit':
        backgroundColor = '#60a5fa'; // bleu
        break;
      case 'Delayed':
        backgroundColor = '#facc15'; // jaune
        break;
      case 'Cancelled':
        backgroundColor = '#f87171'; // rouge
        break;
    }
    return { style: { backgroundColor, color: 'black' } };
  };

  const onSelectEvent = (event: CalendarEvent) => {
    setSelectedOrder(event.resource);
  };

  const closeModal = () => setSelectedOrder(null);

  return (
    <>
      <Box sx={{ height: '80vh', p: 2, border: '1px solid #ddd', bgcolor: 'background.paper' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventPropGetter}
          onSelectEvent={onSelectEvent}
          components={{ event: EventComponent }}
        />
      </Box>
      {selectedOrder && <Modal order={selectedOrder} onClose={closeModal} />}
    </>
  );
};

export default OrderCalendar;
