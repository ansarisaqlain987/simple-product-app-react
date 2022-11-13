import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function UpdateModal({ show, handleClose, modalType, selectedData, addProduct, updateProduct, deleteProduct }) {
    const [data, setData] = useState({
        _id: modalType === 'add' ? '' : selectedData._id ?? '',
        name: modalType === 'add' ? '' : selectedData.name ?? '',
        price: modalType === 'add' ? 0 : selectedData.price ?? 0
    });

    const [errorText, setErrorText] = useState({
        name: '',
        price: ''
    });

    const onIdChange = (value) => {
        setData({ _id: value, name: data.name, price: data.price });
    }
    const onNameChange = (value) => {
        setData({ _id: data._id, name: value, price: data.price });
    }
    const onPriceChange = (value) => {
        if (Number(value)) setData({ _id: data._id, name: data.name, price: Number(value) })
    }

    const isDataValid = () => {
        let validResult = true;
        console.log("DATA: ", data)
        let errorObj = {
            name: '',
            price: ''
        }
        if (data.name.trim() === '') {
            validResult = false;
            errorObj.name = 'Name cannot be empty';
        }
        if (data.price <= 0) {
            validResult = false;
            errorObj.price = 'Please enter correct price';
        }
        console.log("EOBJ: ", errorObj)
        setErrorText(errorObj);
        return validResult
    }

    const handleAddProduct = () => {
        if (isDataValid()) {
            addProduct(data);
            handleClose();
        }
    }

    const handleUpdateProduct = () => {
        if (isDataValid()) {
            updateProduct(data);
            handleClose();
        }
    }

    const handleDeleteProduct = () => {
        deleteProduct(data);
        handleClose();
    }

    useEffect(() => {
        setData({
            _id: modalType === 'add' ? '' : selectedData._id ?? '',
            name: modalType === 'add' ? '' : selectedData.name ?? '',
            price: modalType === 'add' ? 0 : selectedData.price ?? 0
        })
    }, [selectedData, modalType])

    const addModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Product Name" onChange={(event) => onNameChange(event.target.value)} />
                            <Form.Text className="text-muted red-color-error">
                                {errorText.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="text" placeholder="Product Price" onChange={(event) => onPriceChange(event.target.value)} />
                            <Form.Text className="text-muted red-color-error">
                                {errorText.price}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };
    const updateModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled type="text" value={data._id} onChange={(event) => onIdChange(event.target.value)} />
                            <Form.Text className="text-muted" >
                                {errorText.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" value={data.name} placeholder="Product Name" onChange={(event) => onNameChange(event.target.value)} />
                            <Form.Text className="text-muted red-color-error">
                                {errorText.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="text" value={data.price} placeholder="Product Price" onChange={(event) => onPriceChange(event.target.value)} />
                            <Form.Text className="text-muted red-color-error">
                                {errorText.price}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Update Product
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };
    const deleteModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled type="text" value={data._id} onChange={(event) => onIdChange(event.target.value)} />
                            <Form.Text className="text-muted" >
                                {errorText.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled type="text" value={data.name} placeholder="Product Name" onChange={(event) => onNameChange(event.target.value)} />
                            <Form.Text className="text-muted">
                                {errorText.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control disabled type="text" value={data.price} placeholder="Product Price" onChange={(event) => onPriceChange(event.target.value)} />
                            <Form.Text className="text-muted">
                                {errorText.price}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteProduct}>
                        Delete Product
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    switch (modalType) {
        case 'add': {
            return addModal();
        }
        case 'update': {
            return updateModal();
        }
        case 'delete': {
            return deleteModal();
        }
        default: {
            return (<></>)
        }
    }
}

export default UpdateModal;