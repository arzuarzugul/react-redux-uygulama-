/*import React, { useEffect, useState } from "react";
import ProductCart from "../componant/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../componant/Modal";
import Input from "../componant/Input";
import Button from "../componant/Button";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // dispatch(modalFunc());
  const location=useLocation();
  const navigate=useNavigate();


  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });
 
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

  let loc=location.search?location.search.split('=')[1]:null;
 
  useEffect(()=>{
    if(loc){
      setProductInfo(data.find((dt)=>dt.id==loc))
    }
  },[loc])

  
  // console.log(modal, "modal")
  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());

  };
  const buttonUpdateFunc=()=>{
     dispatch(updateDataFunc(...productInfo, id:"loc))
     dispatch(modalFunc());
     navigate("/")
  }
  const contentModal = (
    <>
      <Input
        type={"text"}
        placeholder={"ürün ekle"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input value={productInfo.name}
        type={"text"}
        placeholder={"fiyat ekle"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input value={productInfo.price}
        type={"url"}
        placeholder={"ürün ekle"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button btntext={loc? "ürün güncelle" :"ürün oluştur"} onClick={loc?  buttonUpdateFunc :buttonFunc} />
    </>
  );
  return (
    <div>
      <div className="flex items-center flex-wrap ">
        {data?.map((dt, i) => (
          <ProductCart key={i} dt={dt} />
        ))}
      </div>
      {modal && <Modal content={contentModal} title={loc? "ürün güncelle" : "ürün oluştur"} />}
    </div>
  );
  //
  //   <div>
  //     }
  //

  //   {modal && <Modal content={contentModal} title={"ürün oluştur"} />}
  // </div>
};

export default Product;
*/


import React, { useEffect, useState } from "react";
import ProductCart from "../componant/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../componant/Modal";
import Input from "../componant/Input";
import Button from "../componant/Button";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword} = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

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

  let loc = location.search ? location.search.split('=')[1] : null;

  useEffect(() => {
    if (loc) {
      const product = data.find((dt) => dt.id == loc);
      if (product) {
        setProductInfo(product);
      }
    }
  }, [loc, data]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        type={"text"}
        placeholder={"ürün ekle"}
        name={"name"}
        id={"name"}
        value={productInfo.name} // value kontrolü eklendi
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        type={"text"}
        placeholder={"fiyat ekle"}
        name={"price"}
        id={"price"}
        value={productInfo.price} // value kontrolü eklendi
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}  // Resim yükleme için file tipi kullanıldı
        placeholder={"ürün resmi ekle"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btntext={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
      
    </>
  );
const filteredItems=data.filter(dt=>dt.name.toLowerCase().includes(keyword));
  return (
    <div>
      <div className="flex items-center flex-wrap ">
        {filteredItems?.map((dt, i) => (
          <ProductCart key={i} dt={dt} />
        ))}
      </div>
      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "ürün güncelle" : "ürün oluştur"}
        />
      )}
    </div>
  );
};

export default Product;
