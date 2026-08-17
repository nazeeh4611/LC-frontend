"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Card } from "@/components/ui/Card";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/ui/Table";
import { ErrorState, EmptyState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/admin/ToastProvider";
import {
  fetchAdminContactRequests,
  updateAdminContactRequest,
  AdminContactRequest,
} from "@/services/admin/contactRequests.service";

const STATUS_OPTIONS = ["new", "in_progress", "resolved"];

const STATUS_VARIANT: Record<string, BadgeProps["variant"]> = {
  new: "info",
  in_progress: "warning",
  resolved: "success",
};

export default function AdminContactRequestsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<AdminContactRequest[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState<AdminContactRequest | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setStatus("loading");
    fetchAdminContactRequests({ page, search: search || undefined, status: statusFilter || undefined }).then((result) => {
      if (!result.success) {
        setStatus("error");
        setErrorMessage(result.message);
        return;
      }
      setItems(result.data.items);
      setTotalPages(result.data.pagination.totalPages);
      setStatus("ready");
    });
  }

  useEffect(load, [page, search, statusFilter]);

  async function handleUpdate(payload: { status?: string; notes?: string }) {
    if (!selected) return;
    setSaving(true);
    const result = await updateAdminContactRequest(selected._id, payload);
    setSaving(false);
    if (result.success) {
      showToast("Contact request updated");
      setSelected(result.data);
      load();
    } else {
      showToast(result.message, "error");
    }
  }

  return (
    <div>
      <AdminPageHeader title="Contact Requests" description="Manage inbound messages from the public contact form." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 rounded border border-border bg-bg-elevated px-3 py-2 sm:w-72">
          <Search size={15} className="text-ink-faint" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, subject..."
            className="w-full bg-transparent text-sm text-white placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-48"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.replace("_", " ")}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        {status === "loading" && (
          <div className="space-y-2 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}
        {status === "error" && <ErrorState message={errorMessage} onRetry={load} className="py-16" />}
        {status === "ready" && items.length === 0 && (
          <EmptyState title="No contact requests" message="No messages match your filters." className="py-16" />
        )}
        {status === "ready" && items.length > 0 && (
          <Table className="border-0">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Subject</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[item.status] ?? "neutral"} className="capitalize">
                      {item.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink-muted">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <button onClick={() => setSelected(item)} className="text-xs text-gold-bright hover:underline">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <AdminPagination page={page} totalPages={totalPages} onChange={setPage} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Contact Request Details" className="max-w-xl">
        {selected && (
          <ContactRequestDetail
            contact={selected}
            saving={saving}
            onUpdate={handleUpdate}
            onClose={() => setSelected(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function ContactRequestDetail({
  contact,
  saving,
  onUpdate,
  onClose,
}: {
  contact: AdminContactRequest;
  saving: boolean;
  onUpdate: (payload: { status?: string; notes?: string }) => void;
  onClose: () => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.notes ?? "");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><p className="text-xs text-ink-faint">Name</p><p className="text-white">{contact.fullName}</p></div>
        <div><p className="text-xs text-ink-faint">Email</p><p className="text-white">{contact.email}</p></div>
        {contact.phone && (
          <div><p className="text-xs text-ink-faint">Phone</p><p className="text-white">{contact.phone}</p></div>
        )}
        <div><p className="text-xs text-ink-faint">Subject</p><p className="text-white">{contact.subject}</p></div>
      </div>

      <div>
        <p className="mb-1 text-xs text-ink-faint">Message</p>
        <p className="rounded border border-border-hairline bg-bg-elevated p-3 text-sm text-ink-muted">{contact.message}</p>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-hairline pt-5">
        <label className="text-xs uppercase tracking-wider text-ink-muted">Status</label>
        <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.replace("_", " ")}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wider text-ink-muted">Internal Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded border border-border bg-bg-elevated px-4 py-3 text-sm text-white focus:outline-none focus-visible:border-gold-bright"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose}>
          <X size={14} /> Close
        </Button>
        <Button size="sm" disabled={saving} onClick={() => onUpdate({ status: selectedStatus, notes })}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
