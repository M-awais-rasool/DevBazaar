"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ColumnDef, getCoreRowModel, flexRender, useReactTable } from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

const fetchSellers = async () => {
  const res = await fetch("/api/seller", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch sellers");
  const data = await res.json();
  return data.sellers || [];
};

const AllSellersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    const user = session?.user as { role?: string } | undefined;
    if (!user || user.role !== "admin") {
      router.replace("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchSellers()
      .then(setSellers)
      .catch(() => setError("Failed to load sellers."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/seller?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      setSellers((prev) => prev.filter((s: any) => s._id !== id));
      setDeleteId(null);
    } catch (e: any) {
      setError(e.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <span className="text-white">Name</span>,
        cell: (info) => <span className="font-medium text-gray-100">{info.getValue()}</span>,
      },
      {
        accessorKey: "email",
        header: () => <span className="text-white">Email</span>,
        cell: (info) => <span className="text-gray-300">{info.getValue()}</span>,
      },
      {
        accessorKey: "createdAt",
        header: () => <span className="text-white">Joined</span>,
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          return <span className="text-gray-400">{date.toLocaleDateString()}</span>;
        },
      },
      {
        id: "actions",
        header: () => <span className="text-white">Actions</span>,
        cell: ({ row }) => (
          <button
            className="p-2 rounded-full hover:bg-red-600/20 transition-colors duration-200"
            onClick={() => setDeleteId(row.original._id)}
            aria-label="Delete Seller"
          >
            <Trash2 className="w-5 h-5 text-red-500 hover:scale-110 transition-transform" />
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: sellers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-gray-900 flex flex-col items-center px-2 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg"
      >
        All Sellers
      </motion.h1>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-600/20 text-red-300 px-4 py-2 rounded mb-4"
        >
          {error}
        </motion.div>
      )}

      <div className="w-full max-w-7xl overflow-x-auto rounded-xl shadow-2xl bg-[#101010]/80 backdrop-blur-lg border border-white/10">
        <AnimatePresence>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
            </div>
          ) : (
            <motion.table
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-full divide-y divide-gray-800"
            >
              <thead className="bg-[#181818]">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-[#101010]/80">
                <AnimatePresence>
                  {table.getRowModel().rows.map(row => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-[#232323]/60 transition-colors"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#181818] rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Trash2 className="w-6 h-6 text-red-500" /> Delete Seller
              </h2>
              <p className="text-gray-300 mb-6">Are you sure you want to delete this seller? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold shadow-lg"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .loader {
          border-top-color: #2563eb;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AllSellersPage;
