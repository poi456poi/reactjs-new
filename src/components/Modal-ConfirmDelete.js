import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../service/userService"
import { toast } from 'react-toastify';
const ModalConfirmDel = (props) => {
    const { show, handleClose, listUserDelete, handleDeleteTableUserModal } = props;

    const confirmdelete = async () => {
        let res = await deleteUser(listUserDelete.id)
        console.log(res);
        if (res && +res.statusCode === 204) {
            //success
            handleDeleteTableUserModal(listUserDelete);
            toast.success("Delete Success");
            handleClose();

        } else {
            //error
            toast.error("Error!")

        }
    }
    return (<>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Are you Sure Delete User {listUserDelete.first_name + " " + listUserDelete.last_name} ??
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={confirmdelete}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}

export default ModalConfirmDel;