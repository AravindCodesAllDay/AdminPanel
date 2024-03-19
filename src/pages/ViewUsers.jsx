import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

export default function ViewUsers() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const deleteUser = async (_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${import.meta.env.VITE_API}users/${_id}`, {
          method: "DELETE",
        });
        setUserData(userData.filter((user) => user.id !== _id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API}users/admin/verify/${token}`
        );

        if (!response.ok) {
          throw new Error("Failed to verify token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };
    verifyToken();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        console.log(usersData);
        setUserData(usersData.map(mapUserData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const mapUserData = (user) => ({
    id: user._id,
    name: user.name,
    phone: user.phone,
    mail: user.mail,
    cart: user.cart,
    wishlist: user.wishlist,
  });

  const columns = [
    { field: "id", headerAlign: "center", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", headerAlign: "center", width: 150 },
    { field: "phone", headerName: "Phone", headerAlign: "center", width: 150 },
    { field: "mail", headerName: "Email", headerAlign: "center", width: 200 },
    {
      field: "cart",
      headerName: "Cart",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value.map((item, index) => (
            <div key={index}>
              {item.product}, {item._id}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "wishlist",
      headerName: "Wishlist",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value.map((item, index) => (
            <div key={index}>
              {item.product}, {item._id}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => (
        <ion-icon
          name="trash-outline"
          onClick={() => deleteUser(params.row.id)}
        ></ion-icon>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className=" flex justify-center items-center m-3">
        <Box>
          <DataGrid
            rows={userData}
            columns={columns}
            pageSize={11}
            sx={{
              boxShadow: 10,
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
                backgroundColor: "white",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#40773b",
                color: "white",
              },
            }}
            disableSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
}
