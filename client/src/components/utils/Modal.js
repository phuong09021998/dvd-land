import React from 'react'
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
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
    setIsOpen(true);
    }

    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    }


    return (
        <div>
        <Modal
            isOpen={props.open}
            onAfterOpen={afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <i class="fas fa-check" id="check_icon"></i>
            <h2 ref={_subtitle => (subtitle = _subtitle)} className="modal_title">Your account has been created</h2>
            <button onClick={props.closeModal} className="modal_button">OK</button>
        </Modal>
        </div>
    );
}
