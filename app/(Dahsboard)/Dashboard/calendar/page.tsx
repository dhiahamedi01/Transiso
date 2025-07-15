'use client';

import React from 'react';
import { Calendar, momentLocalizer, Event as RBCEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Typage explicite pour une commande
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

// Typage explicite pour les événements de calendrier
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

// Fonction utilitaire pour convertir string ISO "YYYY-MM-DD" en Date locale sans décalage UTC
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src={order.imageUrl}
        alt={order.recipient}
        style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}
      />
      <div>
        <div style={{ fontWeight: '600', fontSize: 12 }}>{order.id}</div>
        <div style={{ fontSize: 10, color: '#666' }}>{order.recipient}</div>
      </div>
    </div>
  );
};

const OrderCalendar: React.FC = () => {
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
    const order = event.resource;
    alert(
      `Order: ${order.id}\n` +
      `Recipient: ${order.recipient}\n` +
      `Products: ${order.products}\n` +
      `Address: ${order.address}\n` +
      `Status: ${order.status}\n` +
      `Payment: ${order.paymentStatus}`
    );
  };

  return (
    <div style={{ height: '80vh', padding: 16, border: '1px solid #ddd', backgroundColor: 'white' }}>
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
    </div>
  );
};

export default OrderCalendar;
