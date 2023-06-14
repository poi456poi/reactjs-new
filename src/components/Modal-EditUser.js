import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { putUpdateUser } from "../service/userService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const { show, handleClose, dataUserEdit, handleUpdateTableUserModal } = props;
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        handleUpdateTableUserModal({
            first_name: name,
            id: dataUserEdit.id
        })
        handleClose();
        toast.success("Success!");
    }
    useEffect(() => {
        // run when modal is open
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
    //console.log("list user check:", dataUserEdit);
    return (<>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(Event) => setName(Event.target.value)} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input type="text" className=" form-control" value={job} onChange={(Event) => setJob(Event.target.value)} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}

export default ModalAddNew;