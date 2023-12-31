import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';
import { postCreateUser } from "../service/userService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const { show, handleClose, handleUpdateTable } = props;
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        //console.log("res", res);
        if (res && res.id && name) {
            //success
            handleUpdateTable({ first_name: name, id: res.id });
            handleClose();
            setName('');
            setJob('');
            toast.success("Success!");

        } else {
            name === "" ? toast.error("Name can'not blank") : toast.error("Failed!");
            handleClose();
            //error
        }
    }

    return (<>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                <Button variant="primary" onClick={handleSaveUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}

export default ModalAddNew;