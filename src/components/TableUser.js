import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAlluser } from '../service/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './Modal-AddNew';
const TableUsers = (props) => {

    const [IsshowModalAddnew, setIsModalAddnew] = useState(false);

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, settotalUsers] = useState(0);
    const [totalPages, settotalPages] = useState([]);
    const handleClose = () => {
        setIsModalAddnew(false);
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
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
            console.log("data:", res.data)
        }
    }
    const handlePageClick = (event) => {
        console.log(event)
        getAllusers(+event.selected + 1);
    };

    return (<>
        <div className='add-new'>
            <span><h3>List Users</h3></span>
            <button type="button" class="btn btn-info" onClick={() => setIsModalAddnew(true)}>Add New</button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Avatar</th>
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
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <ReactPaginate
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
    </>)
}

export default TableUsers;