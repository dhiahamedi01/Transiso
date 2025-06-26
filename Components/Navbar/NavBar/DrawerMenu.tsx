'use client';

import { Drawer, List, ListItemButton, ListItemText, Divider, Box } from '@mui/material';
import Link from 'next/link';


import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon  from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageSelector from '@/Components/LanguageSelector/LanguageSelector';

type Props = {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
};

export default function DrawerMenu({ open, onClose, links }: Props) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 260, p: 2, direction: 'rtl', fontFamily: '"Noto Kufi Arabic", sans-serif' }}>
        <List>
          {links.map(({ label, href }) => (
            <Link href={href} key={href} passHref legacyBehavior>
              <ListItemButton component="a" onClick={onClose}>
                <ListItemText primary={label}/>
              </ListItemButton>
            </Link>
          ))}
        </List>

        <Divider sx={{ my: 1 }}/>
        {/* extras identiques au top-bar */}
        <Box sx={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: .5 }}>
          الإثنين – الأحد : 9:00 – 20:00
          <LanguageSelector/>
          <Link href="#" onClick={onClose}>الاستفسار اون لاين</Link>
          <span>تابعنا على :</span>
          <span style={{ display:'flex', gap:4 }}>
            <FacebookIcon fontSize="small"/>
            <TwitterIcon  fontSize="small"/>
            <WhatsAppIcon fontSize="small"/>
            <InstagramIcon fontSize="small"/>
          </span>
        </Box>
      </Box>
    </Drawer>
  );
}
