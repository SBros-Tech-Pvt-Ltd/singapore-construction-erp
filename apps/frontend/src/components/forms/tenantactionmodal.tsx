"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, XCircle, AlertTriangle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TenantActionModalProps {
  tenant: {
    tenantName: string;
    owner: string;
    currentStatus: string;
    reason: string;
    dateSuspended: string | null;
    lastPayment: string | null;
    plan: string;
    history: Array<{
      date: string;
      action: string;
      reason: string;
      user: string;
    }>;
  };
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function TenantActionModal({
  tenant,
  onClose,
  onAction,
}: TenantActionModalProps) {
  const [actionReason, setActionReason] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");

  const handleActionClick = (action: string) => {
    if (action === "delete") {
      setConfirmAction(action);
      setShowConfirmDialog(true);
    } else {
      onAction(action);
    }
  };

  const handleConfirmAction = () => {
    onAction(confirmAction);
    setShowConfirmDialog(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="text-green-500" size={24} />;
      case "Suspended":
        return <XCircle className="text-red-500" size={24} />;
      case "Pending Suspension":
        return <AlertTriangle className="text-yellow-500" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-border">
       
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Manage Tenant</h2>
            <p className="text-sm text-muted-foreground mt-1">{tenant.tenantName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
        
          <div className="bg-muted p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{tenant.tenantName}</h3>
                <p className="text-sm text-muted-foreground">{tenant.owner}</p>
              </div>
              {getStatusIcon(tenant.currentStatus)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <p
                  className={`font-semibold ${
                    tenant.currentStatus === "Active"
                      ? "text-green-500"
                      : tenant.currentStatus === "Suspended"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {tenant.currentStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscription Plan</p>
                <p className="font-semibold text-foreground">{tenant.plan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reason</p>
                <p className="font-semibold text-foreground">
                  {tenant.reason !== "N/A" ? tenant.reason : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Payment</p>
                <p className="font-semibold text-foreground">
                  {tenant.lastPayment || "No payment recorded"}
                </p>
              </div>
              {tenant.dateSuspended && (
                <div>
                  <p className="text-sm text-muted-foreground">Date Suspended</p>
                  <p className="font-semibold text-red-500">{tenant.dateSuspended}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="actionReason">Action Reason (Optional)</Label>
            <Textarea
              id="actionReason"
              placeholder="Enter reason for this action..."
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Available Actions</h4>
            <div className="flex flex-wrap gap-3">
              {tenant.currentStatus === "Suspended" && (
                <Button
                  onClick={() => handleActionClick("reactivate")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Reactivate Tenant
                </Button>
              )}
              {tenant.currentStatus === "Active" && (
                <Button
                  onClick={() => handleActionClick("suspend")}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <AlertTriangle size={16} className="mr-2" />
                  Suspend Tenant
                </Button>
              )}
              {tenant.currentStatus === "Pending Suspension" && (
                <>
                  <Button
                    onClick={() => handleActionClick("suspend")}
                    className="bg-red-600 hover:bg-red-700 text-white">
                    <XCircle size={16} className="mr-2" />
                    Suspend Now
                  </Button>
                  <Button
                    onClick={() => handleActionClick("cancel-suspension")}
                    className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle size={16} className="mr-2" />
                    Cancel Suspension
                  </Button>
                </>
              )}
              <Button
                onClick={() => handleActionClick("delete")}
                variant="destructive"
                className="bg-red-700 hover:bg-red-800"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Permanently
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Reactivation / Suspension History</h4>
            <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {tenant.history.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-background p-3 rounded-lg shadow-sm border-l-4 border-border"
                    style={{
                      borderLeftColor: entry.action.includes("Suspended")
                        ? "#ef4444"
                        : entry.action.includes("Reactivated") ||
                          entry.action.includes("Payment")
                        ? "#22c55e"
                        : "#eab308",
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-foreground">{entry.action}</p>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{entry.reason}</p>
                    <span className="text-xs text-muted-foreground">By: {entry.user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={onClose} variant="outline" className="px-6">
              Close
            </Button>
          </div>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-background rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={32} />
              <h3 className="text-xl font-semibold text-foreground">Confirm Action</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground">{tenant.tenantName}</strong>? This action
              cannot be undone and all data will be lost.
            </p>
            <div className="flex gap-3 justify-end">
              <Button onClick={() => setShowConfirmDialog(false)} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                className="bg-red-600 hover:bg-red-700 text-white">
                Yes, Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
