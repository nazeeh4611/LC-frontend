"use client";

import { useState } from "react";
import { Truck, PackageCheck, PlayCircle, CheckCircle2, Ban, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/ToastProvider";
import { updateAdminOrderStatus, ShippingPartnerOption } from "@/services/admin/orders.service";
import { Order } from "@/types";

const NEXT_ACTIONS: Record<string, { label: string; target: string; icon: typeof PlayCircle }[]> = {
  pending: [{ label: "Confirm Order", target: "confirmed", icon: CheckCircle2 }],
  payment_pending: [{ label: "Confirm Order", target: "confirmed", icon: CheckCircle2 }],
  confirmed: [{ label: "Start Processing", target: "processing", icon: PlayCircle }],
  processing: [{ label: "Mark Packed", target: "packed", icon: PackageCheck }],
  packed: [{ label: "Mark Shipped", target: "shipped", icon: Truck }],
  shipped: [{ label: "Mark Out for Delivery", target: "out_for_delivery", icon: Send }],
  out_for_delivery: [{ label: "Mark Delivered", target: "delivered", icon: MapPin }],
};

export function OrderOperationsPanel({
  order,
  shippingPartners,
  onUpdated,
}: {
  order: Order;
  shippingPartners: ShippingPartnerOption[];
  onUpdated: (order: Order) => void;
}) {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber ?? "");
  const [shippingPartner, setShippingPartner] = useState(order.shippingPartner ?? "");

  const canCancel = !["delivered", "cancelled", "refunded"].includes(order.orderStatus);
  const actions = NEXT_ACTIONS[order.orderStatus] ?? [];
  const needsTracking = order.orderStatus === "packed";

  async function handleTransition(target: string) {
    setSaving(true);
    const payload: { orderStatus: string; trackingNumber?: string; shippingPartner?: string } = {
      orderStatus: target,
    };
    if (target === "shipped") {
      payload.trackingNumber = trackingNumber;
      payload.shippingPartner = shippingPartner;
    }
    const result = await updateAdminOrderStatus(order._id, payload);
    setSaving(false);
    if (result.success) {
      showToast(`Order marked as ${target.replace(/_/g, " ")}`);
      onUpdated(result.data);
    } else {
      showToast(result.message, "error");
    }
  }

  async function handleSaveTracking() {
    setSaving(true);
    const result = await updateAdminOrderStatus(order._id, { trackingNumber, shippingPartner });
    setSaving(false);
    if (result.success) {
      showToast("Tracking details saved");
      onUpdated(result.data);
    } else {
      showToast(result.message, "error");
    }
  }

  async function handleCancel() {
    setSaving(true);
    const result = await updateAdminOrderStatus(order._id, { orderStatus: "cancelled" });
    setSaving(false);
    setConfirmCancel(false);
    if (result.success) {
      showToast("Order cancelled");
      onUpdated(result.data);
    } else {
      showToast(result.message, "error");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-bright">Assign Shipping</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select value={shippingPartner} onChange={(e) => setShippingPartner(e.target.value)}>
            <option value="">Select carrier</option>
            {shippingPartners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <Input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking number"
          />
        </div>
        <Button size="sm" variant="outline" className="mt-3" disabled={saving} onClick={handleSaveTracking}>
          Save Tracking Info
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-border-hairline pt-5">
        {actions.map((action) => {
          const Icon = action.icon;
          const disabled = saving || (action.target === "shipped" && needsTracking && !trackingNumber);
          return (
            <Button key={action.target} size="sm" disabled={disabled} onClick={() => handleTransition(action.target)}>
              <Icon size={14} /> {action.label}
            </Button>
          );
        })}
        {canCancel && (
          <Button size="sm" variant="destructive" disabled={saving} onClick={() => setConfirmCancel(true)}>
            <Ban size={14} /> Cancel Order
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        onConfirm={handleCancel}
        title="Cancel this order?"
        description={`This will cancel order ${order.orderNumber}. This action notifies the customer and cannot be undone from here.`}
        confirmLabel="Cancel Order"
        loading={saving}
      />
    </div>
  );
}
