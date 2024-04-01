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
        console.log(data);
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
    <div>
      <h2>Sub-admins</h2>
      {subAdmins.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subAdmins.map((subAdmin, index) => (
              <tr key={index}>
                <td>{subAdmin}</td>
                <td>
                  <button onClick={() => handleRemoveSubAdmin(subAdmin)}>
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
  );
}
