import React, { useEffect, useState } from "react";
import Instance from "../AxiosConfig";

interface Member {
  _id: string;
  memberName?: string;
  email?: string;
  mobile?: string;
  receiptNumber?: number;
  membershipFee?: number | string;
  membershipType?: string;
  fatherName?: string;
  district?: string;
  state?: string;
  image?: string;
  createdAt: string;
}

const AdminPanel = () => {
  const [memberships, setMemberships] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const res = await Instance.get("/api/membership");
      setMemberships(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMemberships(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await Instance.delete(`/api/membership/${id}`);
      setMemberships((prev) => prev.filter((m) => m._id !== id));
      if (selectedMember?._id === id) setSelectedMember(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (member: Member) => {
    setSelectedMember(selectedMember?._id === member._id ? null : member);
  };

  const filteredMembers = memberships.filter((m) =>
    m.memberName?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    String(m.receiptNumber || "").includes(search)
  );

  const totalAmount = memberships.reduce(
    (sum, m) => sum + parseFloat(String(m.membershipFee || 0)), 0
  );

  const typeBadge: Record<string, string> = {
    annual:   "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    lifetime: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
    student:  "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    general:  "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  };
  const getTypeBadge = (t?: string) =>
    typeBadge[t?.toLowerCase() ?? ""] ?? typeBadge.general;

  const stats = [
    {
      label: "Total Members",
      value: memberships.length,
      valueClass: "text-indigo-600",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-500",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: "Total Collected",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      valueClass: "text-emerald-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Membership Management
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Manage and monitor all registered members
          </p>
        </div>
        <button
          onClick={fetchMemberships}
          className="mt-3 flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 sm:mt-0"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-5 text-sm font-medium text-slate-400">Loading members…</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {s.label}
                  </p>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg} ${s.iconColor}`}>
                    {s.icon}
                  </span>
                </div>
                <p className={`text-3xl font-bold ${s.valueClass}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Search Bar ── */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name, email or receipt…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 shadow-sm transition hover:bg-slate-100"
              >
                Clear
              </button>
            )}
          </div>

          {/* ── Table ── */}
          {filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-24 shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-600">No members found</p>
              <p className="mt-1 text-xs text-slate-400">Try a different search query</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="max-h-[600px] overflow-x-auto overflow-y-auto">
                <table className="w-full text-sm">

                  {/* Head */}
                  <thead className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-violet-600">
                    <tr>
                      {["Receipt", "Member", "Contact", "Type", "Amount", "Date", "Action"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/80 ${i === 6 ? "text-center" : "text-left"}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((member) => {
                      const isOpen = selectedMember?._id === member._id;
                      return (
                        <React.Fragment key={member._id}>

                          {/* Main Row */}
                          <tr
                            onClick={() => handleSelect(member)}
                            className={`cursor-pointer transition-colors duration-150 ${isOpen ? "bg-indigo-50/70" : "hover:bg-slate-50"}`}
                          >
                            {/* Receipt */}
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                                #{String(member.receiptNumber || 0).padStart(4, "0")}
                              </span>
                            </td>

                            {/* Member */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-xs font-bold text-white shadow-sm">
                                  {member.memberName?.[0]?.toUpperCase() ?? "M"}
                                </div>
                                <span className="font-semibold text-slate-700">{member.memberName || "—"}</span>
                              </div>
                            </td>

                            {/* Contact */}
                            <td className="px-5 py-4">
                              <p className="text-slate-600">{member.email || "—"}</p>
                              <p className="mt-0.5 text-xs text-slate-400">{member.mobile || ""}</p>
                            </td>

                            {/* Type */}
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${getTypeBadge(member.membershipType)}`}>
                                {member.membershipType || "General"}
                              </span>
                            </td>

                            {/* Amount */}
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                                ₹{parseFloat(String(member.membershipFee || 0)).toLocaleString("en-IN")}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="px-5 py-4">
                              <p className="text-slate-600">
                                {new Date(member.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-400">
                                {new Date(member.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </td>

                            {/* Delete */}
                            <td className="px-5 py-4 text-center" onClick={(e) => { e.stopPropagation(); handleDelete(member._id); }}>
                              <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500">
                                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <polyline points="3 6 5 6 21 6"/>
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                  <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                                </svg>
                              </button>
                            </td>
                          </tr>

                          {/* ── Expanded Detail Row ── */}
                          {isOpen && (
                            <tr>
                              <td colSpan={7} className="bg-gradient-to-br from-indigo-50/60 to-violet-50/40 px-6 py-6">
                                <div className="grid gap-6 md:grid-cols-3">

                                  {/* Avatar Block */}
                                  <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                      <img
                                        src={member.image || ""}
                                        alt={member.memberName}
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src =
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(member.memberName || "M")}&background=6366f1&color=fff&size=128&bold=true`;
                                        }}
                                        className="h-28 w-28 rounded-2xl border-2 border-indigo-200 object-cover shadow-lg"
                                      />
                                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-indigo-600 px-3 py-0.5 text-[10px] font-bold text-white shadow">
                                        #{String(member.receiptNumber || 0).padStart(4, "0")}
                                      </span>
                                    </div>
                                    <div className="mt-2 text-center">
                                      <p className="font-bold text-slate-700">{member.memberName}</p>
                                      <p className="text-xs text-slate-400">{member.email}</p>
                                    </div>
                                    <span className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize ${getTypeBadge(member.membershipType)}`}>
                                      {member.membershipType || "General"} Member
                                    </span>
                                  </div>

                                  {/* Personal Info */}
                                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Personal Info</p>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Full Name",      value: member.memberName },
                                        { label: "Father's Name",  value: member.fatherName || "N/A" },
                                        { label: "Mobile",         value: member.mobile || "N/A" },
                                        { label: "Email",          value: member.email || "N/A" },
                                      ].map(({ label, value }) => (
                                        <div key={label}>
                                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                                          <p className="mt-0.5 text-sm font-medium text-slate-700 break-all">{value}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Membership Info */}
                                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Membership Info</p>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Receipt No.",  value: `#${String(member.receiptNumber || 0).padStart(4, "0")}` },
                                        { label: "District",     value: member.district || "N/A" },
                                        { label: "State",        value: member.state || "N/A" },
                                        { label: "Fee Paid",     value: `₹${parseFloat(String(member.membershipFee || 0)).toLocaleString("en-IN")}` },
                                        { label: "Joined On",    value: new Date(member.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) },
                                      ].map(({ label, value }) => (
                                        <div key={label}>
                                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                                          <p className="mt-0.5 text-sm font-medium text-slate-700">{value}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                </div>
                              </td>
                            </tr>
                          )}

                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
                <p className="text-xs text-slate-400">
                  Showing{" "}
                  <span className="font-semibold text-slate-600">{filteredMembers.length}</span>
                  {" "}of{" "}
                  <span className="font-semibold text-slate-600">{memberships.length}</span>
                  {" "}members
                </p>
                <p className="text-xs font-semibold text-emerald-600">
                  Filtered Total: ₹{filteredMembers
                    .reduce((s, m) => s + parseFloat(String(m.membershipFee || 0)), 0)
                    .toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AdminPanel;