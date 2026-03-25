import React, { useEffect, useState } from "react";
import Instance from "../AxiosConfig";

interface Donation {
  _id: string;
  amount: number;
  cause: string;
  name?: string;
  email?: string;
  mobile?: string;
  anonymous?: boolean;
  message?: string;
  createdAt: string;
}

const DonationAdmin = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await Instance.get("/api/donations/all");
      setDonations(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const filtered = donations.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const avgAmount = donations.length ? Math.round(totalAmount / donations.length) : 0;
  const anonymousCount = donations.filter((d) => d.anonymous).length;

  const causeBadgeColor: Record<string, string> = {
    education: "bg-blue-100 text-blue-700",
    health: "bg-rose-100 text-rose-700",
    food: "bg-amber-100 text-amber-700",
    environment: "bg-green-100 text-green-700",
  };

  const getCauseBadge = (cause: string) =>
    causeBadgeColor[cause?.toLowerCase()] ?? "bg-slate-100 text-slate-600";

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Donation Management
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Track and manage all incoming donations
          </p>
        </div>
        <button
          onClick={fetchDonations}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Donations */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Total Donations
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{donations.length}</p>
          <p className="mt-1 text-xs text-slate-400">All time records</p>
        </div>

        {/* Total Amount */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Total Amount
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            ₹{totalAmount.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-xs text-slate-400">Cumulative collected</p>
        </div>

        {/* Average Donation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Avg. Donation
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            ₹{avgAmount.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-xs text-slate-400">Per donor average</p>
        </div>

        {/* Anonymous */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Anonymous
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{anonymousCount}</p>
          <p className="mt-1 text-xs text-slate-400">Hidden identities</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500 shadow-sm">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          <span className="text-xs font-medium">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 shadow-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-4 text-sm text-slate-400">Loading donations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-600">No donations found</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Donor</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Cause</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d._id} className="group transition-colors hover:bg-slate-50">

                    {/* Donor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${d.anonymous ? "bg-slate-100 text-slate-400" : "bg-indigo-100 text-indigo-600"}`}>
                          {d.anonymous ? "?" : (d.name?.[0]?.toUpperCase() ?? "D")}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">
                            {d.anonymous ? (
                              <span className="italic text-slate-400">Anonymous</span>
                            ) : (
                              d.name || "—"
                            )}
                          </p>
                          {d.message && (
                            <p className="mt-0.5 max-w-[180px] truncate text-xs text-slate-400">
                              "{d.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <p className="text-slate-600">{d.email || "—"}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{d.mobile || ""}</p>
                    </td>

                    {/* Cause */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${getCauseBadge(d.cause)}`}>
                        {d.cause || "General"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                        ₹{Number(d.amount).toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-slate-500">
                      <p>{new Date(d.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {new Date(d.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-600">{donations.length}</span> donations
            </p>
            <p className="text-xs font-semibold text-emerald-600">
              Filtered Total: ₹{filtered.reduce((s, d) => s + Number(d.amount || 0), 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationAdmin;