import css from '../ImageGallery/ImageGallery.module.css'
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(59, 59, 59, 0.75)',
      flexDirection: 'column',
      width:'100%',
      height: '100%'
      
    },
  };
  Modal.setAppElement('#root');


export const ImageModal = ({data,  modalIsOpen, setIsOpen}) => {
 
        let subtitle

          function afterOpenModal() {
            
        }
        
          function closeModal() {
            setIsOpen(false);
          }
          
          

    return (
        <Modal
        className={css.modal}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel={data.alt_description}
        style={customStyles}
      >
        <h2 ref={subtitle} className={css.descr}>{data.alt_description}</h2>
        <img src={data.urls.full} alt={data.alt_description} width={'80%'} height={'70%'} />
        </Modal>
    )
    
}