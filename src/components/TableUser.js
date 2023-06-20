import axios from 'axios';
import { useEffect, useState, useSyncExternalStore } from 'react';
import TableMain from './Table';
import { fetchAlluser } from '../service/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './Modal-AddNew';
import ModalEditUser from './Modal-EditUser';
import _ from 'lodash';
import { debounce } from 'lodash';
import { CarouselItem } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ModalConfirmDel from './Modal-ConfirmDelete';
import Papa from "papaparse";
import { toast } from 'react-toastify';
import '../assets/TableUser.scss'

const TableUsers = (props) => {
    const [IsshowModalAddnew, setIsModalAddnew] = useState(false);
    const [IsshowModalEditUsers, setIsshowModalEditUsers] = useState(false);
    const [IsshowModalConfirmDel, setIsshowModalConfirmDel] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [listUserDelete, setListUserDelete] = useState({});
    const [sortBy, setSortBy] = useState("asc");
    const [fieldSort, setfieldSort] = useState("id");
    const [csvData, setcsvData] = useState([]);

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, settotalUsers] = useState(0);
    const [totalPages, settotalPages] = useState([]);

    const getAllusers = async (page) => {
        let res = await fetchAlluser(page);
        if (res && res.data) {
            setListUsers(res.data)
            settotalUsers(res.total)
            settotalPages(res.total_pages)
            //console.log("data:", res.data)
        }
    }
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
        //console.log(clonelistUsers)
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
        //console.log(listUserDelete)
    }


    useEffect(() => {
        //call apis

        getAllusers();

    }, [])
    const handlePageClick = (event) => {
        getAllusers(+event.selected + 1);
    };
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setfieldSort(sortField);
        let clonelistUsers = _.cloneDeep(listUsers);
        clonelistUsers = _.orderBy(clonelistUsers, [sortField], [sortBy]);
        setListUsers(clonelistUsers)
    }
    const handleSearch = debounce((event) => {
        let keyword = event.target.value;
        let clonelistUsers = _.cloneDeep(listUsers);
        clonelistUsers = clonelistUsers.filter(item => item.first_name.includes(keyword) || item.last_name.includes(keyword));
        if (keyword) {
            setListUsers(clonelistUsers);
        } else {
            getAllusers();
        }

    }, 1000);
    //customize data export
    const getDataExport = (event, done) => {
        let res = [];
        if (listUsers && listUsers.length > 0) {
            res.push(["ID", "Email", "First Name", "Last Name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                res.push(arr)
            })
        }
        setcsvData(res);
        done();
    }
    const handleimportCSV = (event) => {
        let file = event.target.files[0];
        console.log(file)
        if (file && file.type !== "text/csv") {
            console.log("fafa");
            return;

        }

        //Parse CSV data
        let res = [];
        Papa.parse(file, {
            complete: function (results) {
                let rawDataCSV = results.data;
                console.log(results.data)
                if (rawDataCSV.length > 0) {
                    if (rawDataCSV[0]) {
                        if (rawDataCSV[0][0] !== "ID" || rawDataCSV[0][1] !== "email" || rawDataCSV[0][2] !== "first_name" || rawDataCSV[0][3] !== "last_name") {
                            toast.error("Wrong format CSV file")
                        } else {
                            rawDataCSV.map((item, index) => {
                                if (index > 0 && item.length > 3) {
                                    let obj = {};
                                    obj.email = item[0];
                                    obj.first_name = item[1];
                                    obj.last_name = item[2];
                                    res.push(obj)
                                }
                            })
                            console.log("check datacsv:", res);
                            setListUsers(res)

                        }
                    } else {
                        toast.error("No Data")
                    }
                } else {
                    toast.error("error");
                }
            }
        })

    }

    return (<>
        <TableMain
            listUsers={listUsers}
            handleSort={handleSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsModalAddnew={setIsModalAddnew}
            handleSearch={handleSearch}
            csvData={csvData}
            getDataExport={getDataExport}
            handleimportCSV={handleimportCSV}
        />
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