import React, { useState, useEffect } from "react";
export default function ViewSubAdmin() {
  const [subAdmins, setSubAdmins] = useState([]);

  useEffect(() => {
    async function fetchSubAdmins() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}admin/`);
        if (!response.ok) {
          throw new Error("Failed to fetch sub-admins");
        }
        const data = await response.json();
        setSubAdmins(data.subusers);
      } catch (error) {
        console.error("Error fetching sub-admins:", error.message);
      }
    }

    fetchSubAdmins();
  }, []);

  const handleRemoveSubAdmin = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}admin/removesubadmin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        alert("Sub-admin removed successfully");
        setSubAdmins(subAdmins.filter((subAdmin) => subAdmin !== email));
      } else {
        throw new Error("Failed to remove sub-admin");
      }
    } catch (error) {
      console.error("Error removing sub-admin:", error.message);
      alert("Error removing sub-admin, please try again later");
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <h2 className="text-2xl font-semibold">Sub-admins</h2>
      <div>
        {subAdmins.length > 0 ? (
          <table className="m-3 shadow-lg border-2 p-2">
            <thead>
              <tr className="border-b-2">
                <th className="m-1">Email</th>
                <th className="m-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.map((subAdmin, index) => (
                <tr key={index} className="border-b-2">
                  <td className="p-2 font-semibold">{subAdmin}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveSubAdmin(subAdmin)}
                      className="bg-red-700 text-white p-1 m-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sub-admins found</p>
        )}
      </div>
    </div>
  );
}
