import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import Spinner from "../../spinner/Spinner";
import "./AddProduct.scss";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Furniture" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  model: "",
  releaseDate: "",
  modelNumber: "",
  weight: 0,
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `shopcart/${uuidv4()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        model: product.model,
        releaseDate: product.releaseDate,
        modelNumber: product.modelNumber,
        weight: Number(product.weight),
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        model: product.model,
        releaseDate: product.releaseDate,
        modelNumber: product.modelNumber,
        weight: Number(product.weight),
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="add-product-wrap">
      {isLoading && <Spinner />}
      <div className="add-product">
        <h3>{detectForm(id, "Add New Product", "Edit Product")}</h3>
        <Card>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <div className="--form-control">
              <label>Product name:</label>
              <input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="--form-control">
              <label>
                Product image:{" "}
                <p className="--small-para">
                  (Select maximum 1 image and image size should be less than
                  2mb)
                </p>
              </label>

              <Card>
                {uploadProgress === 0 ? null : (
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}`
                        : `Upload Complete ${uploadProgress}%`}
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  placeholder="Product Image"
                  name="image"
                  multiple={false}
                  onChange={(e) => handleImageChange(e)}
                  required
                />

                {product.imageURL === "" ? null : (
                  <input
                    type="text"
                    required
                    placeholder="Image URL"
                    name="imageURL"
                    value={product.imageURL}
                    disabled
                  />
                )}
              </Card>
            </div>
            <div className="--form-control">
              <label>Product price:</label>
              <input
                type="number"
                placeholder="Product price"
                required
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="--form-control">
              <label>Product Category:</label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose product category --
                </option>
                {categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="--form-control">
              <label>Product Company/Brand:</label>
              <input
                type="text"
                placeholder="Product brand"
                required
                name="brand"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="--form-control">
              <label>Product Model:</label>
              <input
                type="text"
                placeholder="Product model"
                required
                name="model"
                value={product.model}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="--form-control">
              <label>Product Release Date:</label>
              <input
                type="date"
                placeholder="Product release date"
                required
                name="releaseDate"
                value={product.releaseDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="--form-control">
              <label>Product Model Number:</label>
              <input
                type="text"
                placeholder="Product model number"
                required
                name="modelNumber"
                value={product.modelNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="--form-control">
              <label>
                Product Weight:{" "}
                <p className="--small-para">(mention in grams)</p>
              </label>
              <input
                type="text"
                placeholder="Product weight"
                required
                name="weight"
                value={product.weight}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="--form-control">
              <label>Product Description:</label>
              <textarea
                name="desc"
                required
                value={product.desc}
                onChange={(e) => handleInputChange(e)}
                rows="5"
                cols="30"
              ></textarea>
            </div>
            <button className="button --btn --bg-green">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
