
import ImageGallery from "../Image_produit/ImageGallery";
import Style from "./Product.module.css"
import Rating from '@mui/material/Rating';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState, useRef } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import GradeIcon from '@mui/icons-material/Grade';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { CheckCircle, PaddingOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import Commander from './Commander'


export default function Product() {

  const colors = [
    { name: 'Rouge', value: '#f44336' },
    { name: 'Vert', value: '#4caf50' },
    { name: 'Bleu', value: '#2196f3' },
    { name: 'Jaune', value: '#ffeb3b' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Violet', value: '#9c27b0' },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const descriptionRef = useRef(null);




  const breadcrumbs = [
    <Link className={Style.arabica} underline="hover" key="1" color="inherit" href="/">
      الرئيسية
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      className={Style.arabica}
    >
      قائمة منتجاتنا
    </Link>,
    <Typography className={Style.arabica} key="3" sx={{ color: 'text.primary' }}>
      حاويات بلاستيكية
    </Typography>,
  ];
  return (
    <>
        <Stack spacing={2} className={Style.Breadcrumbs}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
                      {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      <div className={Style.globale}>

        <div className={Style.partie}>
          <ImageGallery />
        </div>


        <div className={Style.partie1}>

        <div className={Style.top_head}>
           <div className={Style.favorite}>
           <FavoriteBorderIcon sx={{fontSize:'16px'}}/>&ensp;المفضلة
           </div>
           <div className={Style.favorite}>
           <CompareArrowsIcon sx={{fontSize:'16px'}}/>&ensp;مقارنة
           </div>
        </div>
        <span className={Style.text_head}>
            <div className={Style.solde}><AutoFixHighIcon sx={{fontSize:'16px'}}/>&ensp;خصم 20%   </div>
              <span className={Style.price_avant}>$&ensp;500.00</span>
        </span>

            <span className={Style.text_head}>
            <span className={Style.titre}>حاويات بلاستيكية</span>
              <span className={Style.price}>$&ensp;450.00 </span>
            </span>
    <br></br>

            <div className={Style.text2}>
                <div className={Style.Title_description}>
                وصف مختصر
                </div>
                <div className={Style.description}>
                بصفتي أخصائي علاج طبيعي، أُعجبتُ بشدة بمكعبات IGLU الناعمة. التوازن المثالي بين الصلابة والنعومة يُوفر منصةً مثاليةً للأنشطة البدنية. تضمن القواعد المانعة للانزلاق بيئةً آمنةً للأطفال أثناء التمارين، وتُضفي الألوان الزاهية عنصرًا مُحفزًا بصريًا على الجلسات.
               
                {/*<div className={Style.detaille} onClick={scrollToDescription} style={{cursor: 'pointer'}}>
                  Plus de Detaille <ArrowDropDownIcon></ArrowDropDownIcon>
                </div>*/}
                </div>
            </div>

            
         
            <div className={Style.text3}>
              <p className={Style.stock}>
                <CheckCircleIcon sx={{fontSize:'16px',color: '#47cf67'}}></CheckCircleIcon>&ensp;متوفر في المخزون - 12 منتجًا</p>
              <div className={Style.Round2}>
              <div className={Style.Round}></div>
              </div>

              <div className={Style.Rating}>
                <Rating
                  name="product-rating"
                  value={5}
                  readOnly
                  icon={<GradeIcon fontSize="inherit" sx={{ color: '#FAAF00' }} />}
                  emptyIcon={<GradeIcon fontSize="inherit" sx={{ opacity: 0.3 }} />}
                  sx={{ fontSize: 18 }}
                />
                <p className={Style.p}>(175&nbsp;التقييمات)</p>
              </div>
            </div>
            <div className={Style.text4}>
              <div className={Style.bigou}>
                <p className={Style.p1}>يحفظ الطعام طازجًا ونظيفًا </p>
              </div>

              <div className={Style.Round2}>
                 <div className={Style.Round}></div>
              </div>

              <div className={Style.partage}>
              <div className={Style.social}>
                <FacebookIcon sx={{ color: '#1877F2' }} /> 
                <InstagramIcon sx={{ color: '#E1306C' }} /> 
                <XIcon sx={{ color: '#000000' }} /> 
                <YouTubeIcon sx={{ color: '#FF0000'}} /> 
              </div>
              </div>
              
            </div>
            <div className={Style.text}>
               <Commander/>
            </div>
       
          
        </div>


      </div>
    </>
  );
}
