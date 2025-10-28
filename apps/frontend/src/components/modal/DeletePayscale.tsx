// components/modals/DeletePayscale.tsx
"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header - Solid Red */}
        <div className="bg-red-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="hover:bg-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Are you sure you want to delete this pay scale?
              </h3>
              <p className="text-gray-600">
                This action cannot be undone. All data associated with this pay scale will be permanently removed.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <p className="font-medium">⚠️ Warning</p>
              <p className="mt-1">Employees assigned to this pay scale may be affected.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} className="px-6 h-11">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 px-8 h-11 gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Pay Scale
          </Button>
        </div>
      </div>
    </div>
  );
}