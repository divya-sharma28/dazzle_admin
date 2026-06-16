import { useState } from "react";
import "../styles/NewCategory.css";
import { addCategory } from "../redux/actions/categoryAction";
import { useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCategory = () => {
  const [title, setTitle] = useState({});
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();

  const notifyWarn = () => toast.warning("Upload process started...");

  const handleChange = (e) => {
    setTitle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const data = response.data;
      const imageUrl = data.url;

      const payload = { ...title, image: imageUrl };
      dispatch(addCategory(payload));
      toast.success("Category added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="newCat">
      <h1>Add New Category</h1>

      <div className="catContainer">
        <div className="addCatItem">
          <label style={{ padding: "0 10px 0 0" }}>Image:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {isUploading && <p>Uploading image...</p>}
        </div>

        <div className="addCatTitle">
          <label style={{ padding: "0 10px 0 0" }}>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Category Title"
            onChange={handleChange}
          />
        </div>

        <button
          className="addCatButton"
          onClick={handleClick}
          disabled={isUploading}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewCategory;
