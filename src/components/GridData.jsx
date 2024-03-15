import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { autocompleteClasses } from "@mui/material";

export default function GridData() {
  const [productData, setProductData] = useState([]);
  // const [bestsellers, setBestsellers] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = async (_id) => {
    if (window.confirm("Are you sure to delete product?")) {
      await fetch(`http://localhost:3000/products/${_id}`, { method: "DELETE" });
      setProductData(productData.filter((val) => val.id !== _id));
    }
  };

  const columns = [
    { field: "id",headerAlign: "center", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", headerAlign: "center", width: 150, editable: false },
    {
      field: "photo", headerAlign: "center", headerName: "Image", width: 100, editable: false,
      renderCell: (params) => (
        <img src={`https://nodejs-five-rho.vercel.app/uploads/${params.row.photo}`} alt="Circular Image" className="w-12 h-12 rounded-full" />
      ),
    },
    { field: "description", headerAlign: "center", headerName: "Description", width: 250, editable: false },
    { field: "stock", headerAlign: "center", headerName: "Stock", width: 100, editable: false },
    { field: "price", headerAlign: "center", headerName: "Price", width: 100, editable: false },
    { field: "rating", headerAlign: "center", headerName: "Average Rating", width: 100, editable: false },
    { field: "numOfRating", headerAlign: "center", headerName: "Rating Count", width: 100, editable: false },
    {
      field: "update", headerAlign: "center", headerName: "Update", width: 90, editable: false,
      renderCell: (params) => (
        <ion-icon name="create-outline" onClick={() => navigate(`/update/${params.row.id}`)}></ion-icon>
      ),
    },
    {
      field: "delete", headerName: "Delete", headerAlign: "center", width: 90, editable: false,
      renderCell: (params) => (
        <ion-icon name="trash-outline" onClick={() => deleteProduct(params.row.id)}></ion-icon>
      ),
    },
  ];

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const [productsRes] = await Promise.all([
          fetch("http://localhost:3000/products"),
        ]);
  
        const [productsData] = await Promise.all([
          productsRes.json(),
        ]);
  
        setProductData(productsData.map((element) => ({
          id: element._id,
          name: element.name,
          photo: element.photo,
          description: element.description,
          price: element.price,
          rating: element.rating,
          numOfRating: element.numOfRating,
          stock: element.stock,
        })));
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchRows();
  }, []);
  

  return (
    <Box sx={{ height: "100%", width: autocompleteClasses }}>
      <DataGrid
        rows={productData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 11,
            },
          },
        }}
        pageSizeOptions={[11]}
        sx={{
          boxShadow: 10,
          '& .MuiDataGrid-cell': {
            justifyContent:"center",
            backgroundColor:'white',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor:'#40773b',
            color: 'white'
          },       
        }}
        disableSelectionOnClick
      />
    </Box>
  );
}
