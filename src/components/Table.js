import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";

import '../assets/TableUser.scss'
const TableMain = (props) => {
    const { listUsers, handleSort, handleEdit, handleDelete, setIsModalAddnew, handleSearch, csvData, getDataExport, handleimportCSV } = props;
    return (<>
        <div className='add-new'>
            <span><h3>List Users</h3></span>
            <div className='group-btn'>
                <label className='btn btn-warning' htmlFor='importBtn'>
                    <i className="fa-sharp fa-solid fa-file-arrow-up"
                    ></i><i> Import</i>
                </label>
                <input id="importBtn" type="file" hidden onChange={(event) => handleimportCSV(event)} />
                <CSVLink
                    filename={"ExportDataUser.csv"}
                    data={csvData}
                    asyncOnClick={true}
                    onClick={getDataExport}
                ><i className='btn btn-warning'><i className="fa-sharp fa-solid fa-file-arrow-down"></i> Export</i>
                </CSVLink>
                <button type="button" className="btn btn-info" onClick={() => setIsModalAddnew(true)}><i class="fa-solid fa-circle-plus"></i> Add New</button>
            </div>
        </div>
        <div className='search-bar col-7 my-3'>
            <input
                className='form-control'
                placeholder='Search for ...'
                onChange={(event) => {
                    handleSearch(event)
                }}
            />
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className="sort-header">
                            <span>ID</span>
                            <span><i onClick={() => handleSort("desc", "id")}
                                class="fa-sharp fa-solid fa-down-long"></i>
                                <i onClick={() => handleSort("asc", "id")}
                                    class="fa-sharp fa-solid fa-up-long"></i>
                            </span>
                        </div>
                    </th>
                    <th>Email</th>
                    <th>
                        <div className="sort-header">
                            <span>First Name</span>
                            <span><i onClick={() => handleSort("desc", "first_name")}
                                class="fa-sharp fa-solid fa-down-long"></i>
                                <i onClick={() => handleSort("asc", "first_name")}
                                    class="fa-sharp fa-solid fa-up-long"></i>
                            </span>
                        </div>
                    </th>
                    <th>Last Name</th>
                    <th>Email</th>
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
                                <td>{item.email}</td>
                                <td >
                                    <button className="btn btn-success mx-3" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>

    </>)

}
export default TableMain;