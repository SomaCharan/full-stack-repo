/**
 * Shared compoent for popups and model
 */
 import React from 'react';
 import Dialog from '@material-ui/core/Dialog';
//  import DialogActions from '@material-ui/core/DialogActions';
 import DialogContent from '@material-ui/core/DialogContent';
 import AppBar from '@material-ui/core/AppBar';
 import Toolbar from '@material-ui/core/Toolbar';
 import Typography from '@material-ui/core/Typography';
//  import Button from './Button';
 
 export default function PopUpNew({
   setOpenModal,
   openModal,
   maxWidth,
   Title,
   Content,
 }) {
   return (
     <>
       {openModal ? (
         <Dialog
           open={openModal}
           onClose={() => setOpenModal(false)}
           scroll="paper"
           fullWidth
           maxWidth={maxWidth} // like use value like lg
         >
           <DialogContent>
             <div style={{ flexGrow: 1 }}>
               <AppBar position="static" className="bg-warning">
                 <Toolbar>
                   <Typography variant="h6"> {Title} </Typography>
                 </Toolbar>
               </AppBar>
             </div>
             <div>
               <br />
               <section className="content">{Content}</section>
             </div>
           </DialogContent>
           {/* <DialogActions>
               <div className="container col-lg-6 d-flex justify-content-around">
           <Button
               text="Submit"
               type="submit"
               className="btn btn-sm btn-primary"
               onClick={() => setOpenModal(false)}
             />
             <Button
               text="Close"
               type="reset"
               className="btn btn-sm btn-danger"
               onClick={() => setOpenModal(false)}
             />
             </div>
           </DialogActions> */}
         </Dialog>
       ) : (
         <></>
       )}
     </>
   );
 }
 