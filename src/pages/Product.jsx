import { useState, useEffect } from "react";
import "../styles/Product.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getproduct, updateProducts } from "../redux/actions/productAction";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../requestMethods";

const Product = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product.singleProduct);
  const [updateData, setUpdateData] = useState({});
  const [Cat, setCat] = useState([]);
  const [upSize, setUpSize] = useState([]);
  const [upColor, setUpColor] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const notify = () => toast.success("Product updated to database!");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproduct(productId));
  }, [productId]);

  const handleChange = (e) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setUpSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setUpColor(e.target.value.split(","));
  };
  // console.log(product,"products")
  // console.log(updateData)
  // console.log(upColor)
  // console.log(upSize)

  const handleClick = async (e) => {
    e.preventDefault();

    try {
        setIsUploading(true);
      let imageUrl = product.image; // Keep existing image if no new file

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await userRequest.post("/upload", formData);

        const data = await response.data;

        imageUrl = data.url;
      }
      const payload = {
        ...updateData,
        image: imageUrl,
        categories: Cat.length ? Cat : product.categories,
        size: upSize.length ? upSize : product.size,
        color: upColor.length ? upColor : product.color,
        _id: productId,
      };

      dispatch(updateProducts(payload));
      notify();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed! Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.image} alt="" className="productInfoImg" />
            <span className="productName">
              {updateData.title || product.title}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {JSON.stringify(product?.inStock)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product?.title}
              name="title"
              onChange={handleChange}
              defaultValue={product.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product?.desc}
              name="desc"
              onChange={handleChange}
              defaultValue={product.desc}
            />
            <label>Price</label>
            <input
              type="Number"
              placeholder={product?.price}
              name="price"
              onChange={handleChange}
              defaultValue={product.price}
            />
            <label>Categories</label>
            <input
              type="text"
              placeholder={product?.categories}
              name="categories"
              onChange={handleCat}
              defaultValue={product.categories}
            />
            <label>Size</label>
            <input
              type="text"
              placeholder={product?.size}
              name="size"
              onChange={handleSize}
              defaultValue={product.size}
            />
            <label>Color</label>
            <input
              type="text"
              placeholder={product?.color}
              name="color"
              onChange={handleColor}
              defaultValue={product.color}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              style={{ width: "100px" }}
              onChange={handleChange}
              defaultValue={product.inStock}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.image} alt="" className="productUploadImg" />

              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {isUploading && <p>Uploading image...</p>}
            </div>

            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
