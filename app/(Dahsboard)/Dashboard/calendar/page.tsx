'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as RBCEvent } from 'react-big-calendar';
import moment from 'moment';

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

function parseDateISO(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const defaultImageUrl = '/img/no_img.png';

const OrderCalendar: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Nouveaux états pour la date affichée et la vue actuelle
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/Liste_order');
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const mappedOrders: Order[] = json.data.map((o: any) => ({
            id: o.orderId || o.id.toString(),
            recipient: o.customer || 'Unknown',
            date: o.date ? o.date.split('T')[0] : '',
            address: o.address || '',
            products: o.products || '',
            status: normalizeStatus(o.status),
            paymentStatus: normalizePayment(o.payment),
            imageUrl: defaultImageUrl,
          }));

          setOrders(mappedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Erreur fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  function normalizeStatus(status: string) {
    if (!status) return 'Unknown';
    const s = status.toLowerCase();
    if (s === 'pending') return 'Pending';
    if (s === 'delivered') return 'Delivered';
    if (s === 'cancelled' || s === 'canceled') return 'Cancelled';
    if (s === 'in transit') return 'In Transit';
    if (s === 'delayed') return 'Delayed';
    if (s === 'paid') return 'Paid';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function normalizePayment(payment: string) {
    if (!payment) return 'Unpaid';
    const p = payment.toLowerCase();
    if (p === 'paid') return 'Paid';
    return 'Unpaid';
  }

  const events: CalendarEvent[] = orders.map(order => ({
    title: order.recipient,
    start: parseDateISO(order.date),
    end: parseDateISO(order.date),
    allDay: true,
    resource: order,
  }));

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = '#ccc';
    switch (event.resource.status) {
      case 'Delivered':
        backgroundColor = '#4ade80';
        break;
      case 'In Transit':
        backgroundColor = '#60a5fa';
        break;
      case 'Delayed':
        backgroundColor = '#facc15';
        break;
      case 'Cancelled':
        backgroundColor = '#f87171';
        break;
      case 'Pending':
        backgroundColor = '#fbbf24';
        break;
      case 'Paid':
        backgroundColor = '#34d399';
        break;
    }
    return { style: { backgroundColor, color: 'black' } };
  };

  const onSelectEvent = (event: CalendarEvent) => {
    setSelectedOrder(event.resource);
  };

  const closeModal = () => setSelectedOrder(null);

  // Handlers pour navigation et vue
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: string) => {
    if (view === 'month' || view === 'week' || view === 'day') {
      setCurrentView(view);
    }
  };

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

  if (loading) return <Typography>Chargement des commandes...</Typography>;

  return (
    <Box p={3}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        eventPropGetter={eventPropGetter}
        components={{ event: EventComponent }}
        onSelectEvent={onSelectEvent}
        date={currentDate}              // <- date contrôlée
        view={currentView}              // <- vue contrôlée
        onNavigate={handleNavigate}    // <- gestion navigation
        onView={handleViewChange}       // <- gestion changement vue
      />

      {selectedOrder && <Modal order={selectedOrder} onClose={closeModal} />}
    </Box>
  );
};

export default OrderCalendar;
