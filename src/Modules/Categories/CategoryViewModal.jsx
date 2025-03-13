import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CategoryViewModal = ({ show, onHide, data }) => {

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>Category Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data && (
                    <div>
                        <p><strong>Name:</strong> {data?.name}</p>
                        <p><strong>Created At:</strong> {new Date(data?.creationDate).toLocaleString()}</p>
                        <p><strong>Last Modified:</strong> {new Date(data?.modificationDate).toLocaleString()}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className='border-0'>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryViewModal;