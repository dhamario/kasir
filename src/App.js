import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:3000" });

function App() {
  const [barang, setbarang] = useState([
    {
      "id": 1,
      "name": "Minyak",
      "stock": "2",
      "desk": "Minyak Bimoli 1Kg"
    },
    {
      "id": 2,
      "name": "Terigu",
      "stock": "1",
      "desk": "Terigu 500 gram"
    },
    {
      "id": "3",
      "name": "Gula Pasir",
      "stock": "2",
      "desk": "Gula Pasir 1Kg"
    }
  ]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    desk:"",
  });

  useEffect(() => {
    // fetch data dsini dan set barang

    api.get("/barang").then((res) => {
      setbarang(res.data);
    });
  }, []);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...barang];

    if (formData.name === "") {
      return false;
    }
    if (formData.stock === "") {
      return false;
    }
     if (formData.desk === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((barang) => {
        if (barang.id === isUpdate.id) {
          barang.name = formData.name;
          barang.stock = formData.stock;
          barang.desk = formData.desk;
        }
      });
      api
        .put("/barang/" + isUpdate.id, {
          id: isUpdate.id,
          name: formData.name,
          stock: formData.stock,
          desk: formData.desk,
        })
        .then(() => {
          alert("Data berhasil di update");
        });
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        name: formData.name,
        stock: formData.stock,
        desk: formData.desk,
      };
      data.push(toSave);

      // menambahkan data
      api.post("/barang", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }
    setbarang(data);
    setIsUpdate(false);
    setFormData({ name: "", stock: "", desk: "" });
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...barang];
    let foundData = data.find((barang) => barang.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ name: foundData.name, stock: foundData.stock, desk: foundData.desk });
  }

  function handleDelete(id) {
    let data = [...barang];
    let filteredData = data.filter((barang) => barang.id !== id);

    // menghapus data
    api.delete("/barang/" + id).then(() => alert("Data berhasil dihapus"));
    setbarang(filteredData);
  }

  return (
    <div className="App">
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold" style={{ textAlign:"center" }}>Data Barang</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Nama Product</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Stock</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.stock}
              className="form-control"
              name="stock"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Deskripsi</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.desk}
              className="form-control"
              name="desk"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 425 }}>
        <List
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={barang}
        />
      </div>
    </div>
  );
}

export default App;
