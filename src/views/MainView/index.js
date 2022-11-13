import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CustomList from "../../components/CustomList";
import CustomNavbar from "../../components/CustomNavbar";
import UpdateModal from "../../components/UpdateModal";
import { getRequest, postRequest } from "../../utils/request.util";

const URL = {
    fetchProductList: 'http://localhost:5000/product',
    deleteProduct: 'http://localhost:5000/product/delete',
    addProduct: 'http://localhost:5000/product'
}

const MainView = () => {
    const [productList, setProductList] = useState([]);
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState('add'); //'add', 'update', 'delete'
    const [selectedData, setSelectedData] = useState({});

    const openModal = () => {
        setShow(true);
        setModalType('add');
    }
    const closeModal = () => {
        setShow(false);
        setSelectedData({});
    }
    const openUpdateModal = (data) => {
        setSelectedData(data);
        setModalType('update');
        setShow(true);
    }
    const openDeleteModal = (data) => {
        setSelectedData(data);
        setModalType('delete');
        setShow(true);
    }

    const addProduct = (data) => {
        let body = {
            name: data.name,
            price: Number(data.price)
        };
        postRequest(URL.addProduct, body).then(response => {
            fetchProductList();
        }).catch(err => console.log("ERROR: ", err));
    }
    const updateProduct = (data) => {
        let body = {
            name: data.name,
            price: Number(data.price)
        };
        postRequest(`${URL.addProduct}/${data._id}`, body).then(response => {
            fetchProductList();
        }).catch(err => console.log("ERROR: ", err));
    }
    const deleteProduct = (data) => {
        postRequest(`${URL.deleteProduct}/${data._id}`, {}).then(response => {
            fetchProductList();
        }).catch(err => console.log("ERROR: ", err));
    }
    const fetchProductList = () => {
        const productPromise = new Promise(async (resolve, reject) => {
            let response = await getRequest('http://localhost:5000/product')
                .then(response => response.data)
                .catch(err => {
                    return resolve([])
                })
            if (response.statusCode === 200) {
                return resolve(response.data)
            } else {
                return resolve([])
            }
        });

        productPromise.then((data) => {
            setProductList(data ?? [])
        })
    }

    useEffect(() => {
        fetchProductList();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <CustomNavbar handleOpen={openModal} />
                </Row>
                <Row>
                    <CustomList
                        data={productList}
                        openUpdateModal={openUpdateModal}
                        openDeleteModal={openDeleteModal}
                    />
                </Row>
            </Container>
            <UpdateModal addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} show={show} selectedData={selectedData} handleClose={closeModal} modalType={modalType} />
        </div>
    )
}

export default MainView;