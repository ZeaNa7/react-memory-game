import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    restart: () => void;
    number: number;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, restart, number }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title className='text-center'>Memory Game</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <p>Congratulation ! You won with {number} attempt(s)</p>
                <p>Do you want to restart the game?</p>
            </Modal.Body>
            <Modal.Footer className='text-center'>
                <Button variant="secondary" onClick={onClose}>
                    No
                </Button>
                <Button variant="primary" onClick={restart}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Popup;
