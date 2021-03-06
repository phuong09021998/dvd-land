import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default function ModalComponent(props) {
    var subtitle;


    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    }



    return (
        <div>
        <Modal
            isOpen={props.open}
            onAfterOpen={afterOpenModal}
            onRequestClose={props.close}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <i class="fas fa-check" id="check_icon"></i>
            <h2 ref={_subtitle => (subtitle = _subtitle)} className="modal_title">{props.title}</h2>
            <button onClick={props.close} className="modal_button">OK</button>
        </Modal>
        </div>
    );
}
