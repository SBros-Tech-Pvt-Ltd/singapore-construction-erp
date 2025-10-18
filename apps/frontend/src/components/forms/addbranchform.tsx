"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Branch {
  id: number;
  name: string;
  code: string;
  location: string;
  status: "active" | "suspended";
  admin: string;
  adminId: number | null;
  userCount: number;
}

interface Admin {
  id: number;
  name: string;
}

interface AddBranchFormProps {
  admins: Admin[];
  onAddBranch: (branch: Branch) => void;
  onCancel: () => void;
}

export default function AddBranchForm({ admins, onAddBranch, onCancel }: AddBranchFormProps) {
  const [newBranch, setNewBranch] = useState({ 
    name: "", 
    code: "", 
    location: "", 
    admin: "" 
  });

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.code || !newBranch.location) return;
    
    const selectedAdminObj = admins.find(a => a.name === newBranch.admin);
    
    const branch: Branch = {
      id: Date.now(),
      name: newBranch.name,
      code: newBranch.code,
      location: newBranch.location,
      status: "active",
      admin: newBranch.admin || "Not Assigned",
      adminId: selectedAdminObj?.id || null,
      userCount: 0
    };
    
    onAddBranch(branch);
    setNewBranch({ name: "", code: "", location: "", admin: "" });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Branch Name</label>
        <Input
          placeholder="Enter branch name"
          value={newBranch.name}
          onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Branch Code</label>
        <Input
          placeholder="e.g., BR004"
          value={newBranch.code}
          onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
        <Input
          placeholder="Enter location"
          value={newBranch.location}
          onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Branch Admin (Optional)</label>
        <Select 
          value={newBranch.admin} 
          onValueChange={(v) => setNewBranch({ ...newBranch, admin: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Branch Admin" />
          </SelectTrigger>
          <SelectContent>
            {admins.map(admin => (
              <SelectItem key={admin.id} value={admin.name}>{admin.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleAddBranch} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Create Branch
        </Button>
      </div>
    </div>
  );
}