import React, { useState, useEffect } from "react";
import axios from "axios";
import APIs, { authApi, endpoints } from "../../config/APIs";
import { Link, useParams } from "react-router-dom";

const AddShoeForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [shoe,setShoe] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    // Fetch sizes from API
    const fetchSizes = async () => {
      try {
        let token = localStorage.getItem("access_token");
        const res = await authApi(token).get(endpoints["size_all"]);
        setSizes(res.data.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    const fetchShoe = async () => {
      try {
        if(shoe){
          return
        }
        const res = await APIs.get(endpoints["shoe_detail"](id));
        setShoe(res.data.data);
      } catch (ex) {
        console.error(ex);
      } finally{
        if(shoe){
          setName(shoe.name)
          setPrice(shoe.price)
          setImage(shoe.image)
          shoe.shoeDetails.map(e=>{
            handleSizeChange(e.sizeId,e.quantity)
          })
        }
      }
    };
    fetchSizes();
    if(id){
      fetchShoe();
    }
  }, [shoe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("CategoryId", 2);
    formData.append("Img", image);

    const sizeDetails = selectedSizes.map((size) => ({
      sizeId: size.id,
      quantity: size.quantity,
    }));
    formData.append("sizeDetail", JSON.stringify(sizeDetails));
    console.log(formData);
    try {
      let token = localStorage.getItem("access_token");
      const response = await authApi(token).post(
        endpoints["shoe_create"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Shoe created successfully:", response.data);
    } catch (error) {
      console.error("Error creating shoe:", error);
    }
  };

  const handleSizeChange = (sizeId, quantity) => {
    setSelectedSizes((prev) => {
      console.log(selectedSizes)
      const existing = prev.find((size) => size.id === sizeId);
      if (existing) {
        return prev.map((size) =>
          size.id === sizeId ? { ...size, quantity } : size
        );
      } else {
        return [...prev, { id: sizeId, quantity }];
      }
    });
  };
  const checksize=(id)=>{
    let exist = false
    selectedSizes.map(e=>{
      if(e.id == id && e.quantity != 0){
        exist = true
      }
    })
    return exist
  }
  const getquatity=(id)=>{
    let quantity = 0;
    selectedSizes.map(e=>{
      if(e.id == id){
        quantity = e.quantity
      }
    })
    return quantity
  }
  const handleUpdate = ()=>{

  }
  const handleDelete = ()=>{
    
  }
  return (
    <div className="container mx-auto p-4 padding">
      <Link className="underline" to="/admin">
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4">{shoe?"":"Add New Shoe"}</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            className="w-full mt-1 p-2 border rounded"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Select Sizes</label>
          <div className="mt-1 space-y-2">
            {sizes.map((size) => (
              <div key={size.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size.id}
                  checked={checksize(size.id)}
                  onChange={(e) =>
                    handleSizeChange(size.id, e.target.checked ? 1 : 0)
                  }
                  className="mr-2"
                />
                <span>{size.size1}</span>
                <input
                  type="number"
                  min="0"
                  value={getquatity(size.id)}
                  placeholder="Quantity"
                  className="w-20 p-1 border rounded"
                  disabled={!selectedSizes.some((s) => s.id === size.id)}
                  onChange={(e) =>
                    handleSizeChange(size.id, parseInt(e.target.value, 10) || 0)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        {!id?<button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Shoe
        </button>:<>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 mx-5 bg-blue-500 text-white rounded"
        >
          Edit Shoe
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 mx-5 bg-red-500 text-white rounded"
        >
          Delete Shoe
        </button>
        </>}
      </div>
    </div>
  );
};

export default AddShoeForm;
