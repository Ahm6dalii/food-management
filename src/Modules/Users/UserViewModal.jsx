import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { imageURL } from '../../service/api/apiConfig';
import notfound from '../../assets/nodata.png';
const UserViewModal = ({ show, onHide, data }) => {


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className='border-0' closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {data && (
          <div>
            <div className="text-center mb-3">
              <img
                src={`${data?.imagePath?imageURL+data?.imagePath:notfound}`}
                alt="User"
                className="rounded-3 img-width"
               
              />
            </div>
            <p><strong>Username:</strong> {data?.userName}</p>
            <p><strong>Role:</strong> {data?.group?.name}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>Country:</strong> {data?.country}</p>
            <p><strong>Phone Number:</strong> {data?.phoneNumber}</p>
            <p><strong>Group:</strong> {data?.group?.name}</p>
            <p><strong>Created At:</strong> {new Date(data?.group?.creationDate).toLocaleString()}</p>
            <p><strong>Last Modified:</strong> {new Date(data?.group?.modificationDate).toLocaleString()}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='border-0'>
        <Button variant="secondary" onClick={onHide} >close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserViewModal;
