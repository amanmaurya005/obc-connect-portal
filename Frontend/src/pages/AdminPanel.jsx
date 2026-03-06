// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const AdminPanel = () => {
//   const [memberships, setMemberships] = useState([]);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [loading, setLoading] = useState(false);



//   const Section = ({ title, children }) => (
//     <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//       <h3 className="font-semibold text-lg mb-3 text-gray-700 border-b pb-1">
//         {title}
//       </h3>
//       <div className="grid md:grid-cols-2 gap-3">
//         {children}
//       </div>
//     </div>
//   );
  
//   const Field = ({ label, value }) => (
//     <p className="text-sm">
//       <span className="font-semibold text-gray-700">{label}:</span>{" "}
//       <span className="text-gray-600">{value}</span>
//     </p>
//   );

//   const fetchMemberships = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3000/api/membership");
//       setMemberships(res.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMemberships();
//   }, []);

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         Admin Membership Panel
//       </h1>
    
//       {loading ? (
//         <p className="text-center text-lg animate-pulse">Loading...</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
    
//           {/* LEFT SIDE */}
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow-2xl rounded-2xl p-6"
//           >
//             <h2 className="text-xl font-semibold mb-6 border-b pb-2">
//               All Members
//             </h2>
    
//             <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//               {memberships.map((member) => (
//                 <motion.div
//                   key={member._id}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() => setSelectedMember(member)}
//                   className="p-4 border rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:shadow-md transition"
//                 >
//                   <p className="font-bold text-blue-600">
//                     #{String(member.receiptNumber).padStart(4, "0")}
//                   </p>
//                   <p className="font-semibold">{member.memberName}</p>
//                   <p className="text-sm text-gray-500">{member.mobile}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
    
//           {/* RIGHT SIDE */}
//           <motion.div
//             key={selectedMember?._id}
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow-2xl rounded-2xl p-6 overflow-y-auto max-h-[700px]"
//           >
//             <h2 className="text-xl font-semibold mb-6 border-b pb-2">
//               Member Details
//             </h2>
    
//             {selectedMember ? (
//               <div className="space-y-6">
    
//                 {/* Profile Section */}
//                 <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl shadow-sm">
//                   <img
//                     src={selectedMember.image}
//                     alt=""
//                     className="w-32 h-32 object-cover rounded-xl border-2 border-blue-500"
//                   />
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">
//                       {selectedMember.memberName}
//                     </h2>
//                     <p className="text-gray-600">
//                       Receipt No: #
//                       {String(selectedMember.receiptNumber).padStart(4, "0")}
//                     </p>
//                     <p className="text-blue-600 font-semibold">
//                       {selectedMember.membershipType}
//                     </p>
//                   </div>
//                 </div>
    
//                 {/* Sections */}
//                 <Section title="Personal Details">
//                   <Field label="Father Name" value={selectedMember.fatherName} />
//                   <Field label="Date of Birth" value={new Date(selectedMember.dob).toLocaleDateString("en-IN")} />
//                   <Field label="Marriage Date" value={selectedMember.marriageDate ? new Date(selectedMember.marriageDate).toLocaleDateString("en-IN") : "-"} />
//                   <Field label="Blood Group" value={selectedMember.bloodGroup} />
//                   <Field label="T-Shirt Size" value={selectedMember.tshirtSize} />
//                 </Section>
    
//                 <Section title="Contact Details">
//                   <Field label="Email" value={selectedMember.email} />
//                   <Field label="Mobile" value={selectedMember.mobile} />
//                   <Field label="WhatsApp" value={selectedMember.whatsapp || "-"} />
//                   <Field label="Residence Phone" value={selectedMember.residencePhone || "-"} />
//                   <Field label="Office Phone" value={selectedMember.officePhone || "-"} />
//                 </Section>
    
//                 <Section title="Address">
//                   <Field label="Residence" value={selectedMember.residenceAddress} />
//                   <Field label="Office" value={selectedMember.officeAddress || "-"} />
//                   <Field label="State" value={selectedMember.state} />
//                   <Field label="District" value={selectedMember.district} />
//                 </Section>
    
//                 <Section title="Education & Work">
//                   <Field label="Education" value={selectedMember.education} />
//                   <Field label="Other Education" value={selectedMember.otherEducation || "-"} />
//                   <Field label="Business Nature" value={selectedMember.businessNature || "-"} />
//                   <Field label="Organization Position" value={selectedMember.organizationPosition || "-"} />
//                 </Section>
    
//                 <Section title="Other Information">
//                   <Field label="Social Work" value={selectedMember.socialWork || "-"} />
//                   <Field label="Special Achievement" value={selectedMember.specialAchievement || "-"} />
//                   <Field label="PAN" value={selectedMember.pan || "-"} />
//                   <Field label="Aadhaar" value={selectedMember.aadhaar || "-"} />
//                   <Field label="Membership Fee" value={`₹${selectedMember.membershipFee}`} />
//                   <Field label="Created At" value={new Date(selectedMember.createdAt).toLocaleDateString("en-IN")} />
//                 </Section>
    
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center mt-10">
//                 Select a member to view details
//               </p>
//             )}
//           </motion.div>
    
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  
  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/membership");
      setMemberships(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/membership/${id}`);
      setMemberships((prev) => prev.filter((m) => m._id !== id));
      if (selectedMember?._id === id) setSelectedMember(null);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Toggle Detail
  const handleSelect = (member) => {
    setSelectedMember(
      selectedMember?._id === member._id ? null : member
    );
  };

  // ✅ Search Filter
  const filteredMembers = memberships.filter((m) =>
    m.memberName?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    String(m.receiptNumber || "").includes(search)
  );

  // ✅ Total Amount
  const totalAmount = memberships.reduce(
    (sum, m) => sum + parseFloat(m.membershipFee || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Admin Membership Panel
      </h1>

      {loading ? (
        <p className="text-center text-lg animate-pulse">Loading...</p>
      ) : (
        <div className="space-y-8 w-full">

          {/* CARDS */}
          <div className="flex flex-wrap gap-6 w-full">
            
            <div className="flex-1 min-w-[250px] bg-white shadow-lg rounded-2xl p-6 text-center">
              <h2 className="text-gray-500 text-sm">Total Members</h2>
              <p className="text-3xl font-bold text-blue-600">
                {memberships.length}
              </p>
            </div>

            <div className="flex-1 min-w-[250px] bg-white shadow-lg rounded-2xl p-6 text-center">
              <h2 className="text-gray-500 text-sm">Total Amount</h2>
              <p className="text-3xl font-bold text-green-600">
                ₹{totalAmount.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by Receipt ID, Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />

          {/* TABLE FULL WIDTH */}
          <div className="w-full bg-white shadow-xl rounded-2xl p-6">
            <div className="w-full overflow-x-auto max-h-[500px] overflow-y-auto rounded-xl">

              <table className="w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Receipt</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-center">Delete</th>
                  </tr>
                </thead>

                <tbody className="divide-y bg-white">
                  {filteredMembers.map((member) => (
                    <React.Fragment key={member._id}>
                      
                      {/* MAIN ROW */}
                      <tr
                        onClick={() => handleSelect(member)}
                        className="cursor-pointer hover:bg-blue-50 transition"
                      >
                        <td className="px-4 py-3 font-bold text-blue-600">
                          #{String(member.receiptNumber || 0).padStart(4, "0")}
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          {member.memberName}
                        </td>

                        <td className="px-4 py-3">
                          {member.email}
                        </td>

                        <td className="px-4 py-3">
                          {member.mobile}
                        </td>

                        <td className="px-4 py-3 font-semibold text-green-600">
                          ₹{parseFloat(member.membershipFee || 0).toLocaleString("en-IN")}
                        </td>

                        <td className="px-4 py-3">
                          {new Date(member.createdAt).toLocaleDateString("en-IN")}
                        </td>

                        <td
                          className="px-4 py-3 text-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(member._id);
                          }}
                        >
                          <span className="text-red-500 hover:text-red-700 text-lg cursor-pointer">
                            🗑
                          </span>
                        </td>
                      </tr>

                      {/* DETAIL ROW */}
                      {selectedMember?._id === member._id && (
                        <tr>
                          <td colSpan="7" className="bg-gray-50 p-6">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="grid md:grid-cols-2 gap-6"
                            >
                              <div className="flex justify-center">
                                <img
                                  src={member.image || "/default-avatar.png"}
                                  alt=""
                                  className="w-32 h-32 object-cover rounded-xl border-2 border-blue-500"
                                />
                              </div>

                              <div className="space-y-2 text-sm">
                                <p><strong>Father:</strong> {member.fatherName || "N/A"}</p>
                                <p><strong>District:</strong> {member.district || "N/A"}</p>
                                <p><strong>State:</strong> {member.state || "N/A"}</p>
                                <p><strong>Membership Type:</strong> {member.membershipType || "N/A"}</p>
                                <p><strong>Fee:</strong> ₹{parseFloat(member.membershipFee || 0).toLocaleString("en-IN")}</p>
                                <p><strong>Created:</strong> {new Date(member.createdAt).toLocaleDateString("en-IN")}</p>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {filteredMembers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No Members Found
                </div>
              )}

            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminPanel;