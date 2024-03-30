import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function ViewOrders() {
  const [orderData, setOrderData] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [showOrderStatus, setShowOrderStatus] = useState("pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const ordersData = await response.json();
        const mappedOrders = ordersData.map(mapOrderData);
        setOrderData(mappedOrders);
        setPendingOrders(
          mappedOrders.filter((order) => order.status === "pending")
        );
        setDeliveredOrders(
          mappedOrders.filter((order) => order.status === "delivered")
        );
        setCanceledOrders(
          mappedOrders.filter((order) => order.status === "canceled")
        );
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
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

  const columns = [
    { field: "id", headerAlign: "center", headerName: "ID", width: 90 },
    {
      field: "address",
      headerName: "Address",
      headerAlign: "center",
      width: 300,
    },
    { field: "phone", headerName: "Phone", headerAlign: "center", width: 150 },
    { field: "date", headerName: "Date", headerAlign: "center", width: 150 },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "paymentDone",
      headerName: "Paid",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      width: 150,
    },
  ];

  return (
    <>
      <div>
        <div className="w-screen justify-center flex gap-8 p-8">
          <button
            className={`border-2 rounded-lg px-3 py-1 hover:bg-[#40773b] hover:text-white ${
              showOrderStatus == "pending"
                ? "bg-[#40773b] text-white"
                : "bg-white text-[#40773b]"
            } `}
            onClick={() => setShowOrderStatus("pending")}
          >
            <h2>Pending Orders</h2>
          </button>
          <button
            className={`border-2 rounded-lg px-3 py-1 hover:bg-[#40773b] hover:text-white ${
              showOrderStatus == "delivered"
                ? "bg-[#40773b] text-white"
                : "bg-white text-[#40773b]"
            } `}
            onClick={() => setShowOrderStatus("delivered")}
          >
            <h2>Delivered Orders</h2>
          </button>
          <button
            className={`border-2 rounded-lg px-3 py-1 hover:bg-[#40773b] hover:text-white ${
              showOrderStatus == "canceled"
                ? "bg-[#40773b] text-white"
                : "bg-white text-[#40773b]"
            } `}
            onClick={() => setShowOrderStatus("canceled")}
          >
            <h2>Canceled Orders</h2>
          </button>
        </div>
        <div className=" flex justify-center items-center m-3">
          <Box>
            <DataGrid
              rows={
                showOrderStatus == "pending"
                  ? pendingOrders
                  : showOrderStatus == "delivered"
                  ? deliveredOrders
                  : canceledOrders
              }
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
      </div>
    </>
  );
}
