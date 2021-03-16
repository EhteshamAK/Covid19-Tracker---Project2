import React from 'react';
import {Card, CardContent, Typography,} from '@material-ui/core';
import './InfoBox.css';


 function InfoBox({title, cases, active, total, isRed, ...props}) {
     return (
         <Card className = {`infobox  ${active && 'infobox--selected'} ${isRed && "infobox--red"}`}
          onClick ={props.onClick}>
         
             <CardContent > 
             
             {/* title */}
             <Typography color="textSecondary" className="infobox-title">
              {title}
              
            </Typography>
            

             {/* cases */}
             <h2 className= {`infobox-cases ${!isRed && "infobox-cases--green"}`}>
                 {cases}
             </h2>

             {/* 1.2 M total cases */}
             <Typography color="textSecondary" className= "infobox-total" >
              {total} Total
            </Typography>
             
             </CardContent>
        </Card>
         
     )
 }
 
 export default InfoBox;
 