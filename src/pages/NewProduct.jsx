import { useState } from "react";
import "../styles/NewProduct.css";

import { addProducts } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../requestMethods";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  // const error = useSelector(state => state.product.error)
  const notifyWarn = () => toast.warning("Upload process started...");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(cat);
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    notifyWarn();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await userRequest.post("/upload", formData);

      const data = await response.data;

      const imageUrl = data.url;

      const product = {
        ...inputs,
        image: imageUrl,
        categories: cat,
        color,
        size,
      };

      dispatch(addProducts(product));

      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add New Product</h1>

      <form className="addProductForm">
        <div className="left">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {isUploading && <p>Uploading image...</p>}
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Colors</label>
            <input
              type="text"
              name="color"
              placeholder="Example: red,blue"
              onChange={handleColor}
            />
          </div>
        </div>

        <div className="right">
          <div className="addProductItem">
            <label>Sizes</label>
            <input
              type="text"
              name="size"
              placeholder="Example: S,M,L"
              onChange={handleSize}
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input
              type="text"
              placeholder="Example: jeans,shirt"
              onChange={handleCat}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              placeholder="Product Description"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select onChange={handleChange} name="inStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button className="addProductButton" onClick={handleClick}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
