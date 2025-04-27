import React, { useEffect, useState } from "react";
import ProductCart from "../componant/ProductCart";
import Modal from "../componant/Modal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../componant/Input";
import Button from "../componant/Button";
import { modalFunc } from "../redux/modalSlice";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.modal);
  const { data,keyword } = useSelector((state) => state.data);
  const navigate=useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "null",
  });

  const location = useLocation();
  const loc = location?.search.split("=")[1];


  useEffect(() => {
    if (loc) {
      const selectedProduct = data.find((dt) => dt.id === Number(loc));
      if (selectedProduct) {
        setProductInfo(selectedProduct);
      }
    }
  }, [loc, data]);

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };
  const updateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id:loc }));
    dispatch(modalFunc());
    navigate('/')
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type="text"
        placeholder="Ürün Oluştur"
        name="name"
        id="name"
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo.price}
        type="text"
        placeholder="Fiyat Oluştur"
        name="price"
        id="price"
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type="file"
        placeholder="Resim Seç"
        name="url"
        id="url"
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button btntext="Oluştur" onClick={loc ? updateFunc :buttonFunc} />
    </>
  );
const filteredItems=data.filter(dt=>dt.name.toLowerCase().includes(keyword))
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCart key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün Güncelle": "Ürün Oluştur"}
          btntext="Oluştur"
          btnFunc={buttonFunc}
        />
      )}
    </div>
  );
};

export default Product;
