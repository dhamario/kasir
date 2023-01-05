import React from "react";

export default function List({ data, handleEdit, handleDelete }) {
  return (
    <div className="list-group">
      {data.map((barang, index) => {
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{barang.name}</h5>
              <div>
                <button
                  onClick={() => handleEdit(barang.id)}
                  className="btn btn-sm btn-link"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(barang.id)}
                  className="btn btn-sm btn-link"
                >
                  Del
                </button>
              </div>
            </div>
            <p className="mb-1">{barang.stock}</p>
             <p className="mb-1">{barang.desk}</p>
          </div>
        );
      })}
    </div>
  );
}
