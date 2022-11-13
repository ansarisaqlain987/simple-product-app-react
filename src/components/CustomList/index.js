import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomList = ({ data, openUpdateModal, openDeleteModal }) => {

    return (
        <Fragment >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "25%" }}>Product ID</th>
                        <th scope="col" style={{ width: "45%" }}>Product Name</th>
                        <th scope="col" style={{ width: "15%" }}>Price</th>
                        <th scope="col" style={{ width: "15%" }} colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(element => {
                            return (
                                <tr key={element._id}>
                                    <td>{element._id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.price}</td>
                                    <td ><FaEdit className='action-edit-button' onClick={() => { openUpdateModal(element) }} /></td>
                                    <td ><FaTrash className='action-delete-button' onClick={() => { openDeleteModal(element) }} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Fragment>
    );
}

export default CustomList;