import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAlluser } from '../service/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './Modal-AddNew';
import ModalEditUser from './Modal-EditUser';
import _ from 'lodash';
import { CarouselItem } from 'react-bootstrap';
import ModalConfirmDel from './Modal-ConfirmDelete';
const TableUsers = (props) => {
    const [IsshowModalAddnew, setIsModalAddnew] = useState(false);
    const [IsshowModalEditUsers, setIsshowModalEditUsers] = useState(false);
    const [IsshowModalConfirmDel, setIsshowModalConfirmDel] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [listUserDelete, setListUserDelete] = useState({});

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, settotalUsers] = useState(0);
    const [totalPages, settotalPages] = useState([]);
    const handleClose = () => {
        setIsModalAddnew(false);
        setIsshowModalEditUsers(false);
        setIsshowModalConfirmDel(false)
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
        //console.log("list user:", listUsers);
    }
    const handleUpdateTableUserModal = (user) => {
        //lodash
        let clonelistUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        clonelistUsers[index].first_name = user.first_name;
        setListUsers(clonelistUsers);
        console.log(clonelistUsers)
    }
    const handleDeleteTableUserModal = (user) => {
        //lodash
        let clonelistUsers = _.cloneDeep(listUsers);
        clonelistUsers = clonelistUsers.filter(item => item.id !== user.id);
        setListUsers(clonelistUsers);
    }

    const handleEdit = (user) => {
        setDataUserEdit(user);
        setIsshowModalEditUsers(true);
    }

    const handleDelete = (user) => {
        setIsshowModalConfirmDel(true);
        setListUserDelete(user);
        console.log(listUserDelete)
    }
    useEffect(() => {
        //call apis

        getAllusers();

    }, [])

    const getAllusers = async (page) => {
        let res = await fetchAlluser(page);
        if (res && res.data) {
            setListUsers(res.data)
            settotalUsers(res.total)
            settotalPages(res.total_pages)
            //console.log("data:", res.data)
        }
    }
    const handlePageClick = (event) => {
        console.log(event)
        getAllusers(+event.selected + 1);
    };

    return (<>
        <div className='add-new'>
            <span><h3>List Users</h3></span>
            <button type="button" className="btn btn-info" onClick={() => setIsModalAddnew(true)}>Add New</button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                    <button onClick={() => handleDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <ReactPaginate
            // table contribute
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< Previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextLabel="Next >"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
        />
        <ModalAddNew
            show={IsshowModalAddnew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={IsshowModalEditUsers}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleUpdateTableUserModal={handleUpdateTableUserModal}
        />
        <ModalConfirmDel
            show={IsshowModalConfirmDel}
            handleClose={handleClose}
            listUserDelete={listUserDelete}
            handleDeleteTableUserModal={handleDeleteTableUserModal}
        />
    </>)
}

export default TableUsers;