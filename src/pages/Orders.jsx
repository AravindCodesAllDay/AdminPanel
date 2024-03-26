import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

export default function Orders() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API}admin/verify/${token}`
        );

        if (!response.ok) {
          throw new Error("Failed to verify token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/");
      }
    };
    verifyToken();
  }, [navigate]);

  const deleteOrder = async (_id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await fetch(`http://localhost:3000/orders/${_id}`, {
          method: "DELETE",
        });
        setOrderData(orderData.filter((order) => order.id !== _id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const ordersData = await response.json();
        setOrderData(ordersData.map(mapOrderData));
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    // const fetchAddress = async (userId, addressId) => {
    //   console.log(userId, addressId);
    //   const addressRes = await fetch(
    //     `http://localhost:3000/users/address/?identifier=${userId}&addressId=${addressId}`
    //   );
    //   const data = await addressRes.json();
    //   if (addressRes.ok) {
    //     console.log(data);
    //   }
    // };

    fetchOrders();
  }, []);

  const getAddress = (data) => {
    const finalAddress =
      data.address +
      "," +
      data.district +
      "," +
      data.state +
      "-" +
      data.pincode;
    return finalAddress;
  };

  const mapOrderData = (order) => ({
    id: order._id,
    address: getAddress(order.address),
    phone: order.phone,
    date: order.date,
    products: order.products,
    status: order.orderStatus,
    paymentMethod: order.paymentmethod,
    paymentDone: order.paymentDone,
  });

  console.log(orderData);

  const columns = [
    { field: "id", headerAlign: "center", headerName: "ID", width: 90 },
    {
      field: "address",
      headerName: "Address",
      headerAlign: "center",
      width: 200,
    },
    { field: "phone", headerName: "Phone", headerAlign: "center", width: 150 },
    { field: "date", headerName: "Date", headerAlign: "center", width: 150 },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paymentDone",
      headerName: "Paid",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => (
        <ion-icon
          name="trash-outline"
          onClick={() => deleteOrder(params.row.id)}
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
            rows={orderData}
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
