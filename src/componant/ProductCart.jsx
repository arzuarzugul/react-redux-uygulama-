import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ dt }) => {
  const [openEdit, setOppenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const updateFunc=() => {
    dispatch(modalFunc())
    setOppenEdit(false)
    navigate(`/?update=${dt?.id}`)
   
  }
  
  return (
    <div className="w-[200px] h-[200px] relative m-2 rounded-md">
      <img src={dt?.url} className="w-full h-full rounded-md" />
      <div className="absolute w-full bottom-0 bg-indigo-600 text-white flex justify-between py-2 rounded-md px-2">
        <div className="test-lg font-semibold">{dt?.name}</div>
        <div>{dt?.price}</div>
      </div>
      <div
        onClick={() => setOppenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <HiOutlineDotsHorizontal color="white" size={24} />
      </div>
      {openEdit && (
        <div className="bg-black border border-white text-white absolute top-5 p-2 text-sm right-2">
          <div
            onClick={() => dispatch(deleteDataFunc(dt?.id))}
            className="cursor-pointer"
          >
            Sil
          </div>
          <div
            onClick={updateFunc}
            className="cursor-pointer"
          >
            Güncelle
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;

// import React from 'react'

// const ProductCart = () => {
//   return (
//     <div className="w-[200px] h-[200px] relative m-2 rounded-md">
//        <img src={dt?.url} className="w-full h-full rounded-md" />
//     </div>
//   )
// }

// export default ProductCart

