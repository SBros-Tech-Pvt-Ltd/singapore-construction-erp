"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface Address {
  doorNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Branch {
  id: number;
  name: string;
  code: string;
  location: string;
  address: Address;
  logo: string;
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
    address: {
      doorNumber: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    logo: "",
    admin: "" 
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBranch({ ...newBranch, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setNewBranch({ ...newBranch, logo: "" });
  };

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.code || !newBranch.location || 
        !newBranch.address.doorNumber || !newBranch.address.street || 
        !newBranch.address.city || !newBranch.address.country) return;
    
    const selectedAdminObj = admins.find(a => a.name === newBranch.admin);
    
    const branch: Branch = {
      id: Date.now(),
      name: newBranch.name,
      code: newBranch.code,
      location: newBranch.location,
      address: newBranch.address,
      logo: newBranch.logo,
      status: "active",
      admin: newBranch.admin || "Not Assigned",
      adminId: selectedAdminObj?.id || null,
      userCount: 0
    };
    
    onAddBranch(branch);
    setNewBranch({ 
      name: "", 
      code: "", 
      location: "", 
      address: {
        doorNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
      },
      logo: "",
      admin: "" 
    });
  };

  const updateAddressField = (field: keyof Address, value: string) => {
    setNewBranch({
      ...newBranch,
      address: {
        ...newBranch.address,
        [field]: value
      }
    });
  };
  const singaporeAddresses = [
    {
      doorNumber: "1",
      street: "Raffles Place, #02-01 One Raffles Place",
      city: "Singapore",
      state: "Central Area",
      postalCode: "048616",
      country: "Singapore"
    },
    {
      doorNumber: "6",
      street: "Battery Road",
      city: "Singapore",
      state: "Central Area",
      postalCode: "049909",
      country: "Singapore"
    },
    {
      doorNumber: "78",
      street: "Shenton Way",
      city: "Singapore",
      state: "Central Area",
      postalCode: "079120",
      country: "Singapore"
    }
  ];

  const fillSingaporeAddress = (address: typeof singaporeAddresses[0]) => {
    setNewBranch({
      ...newBranch,
      location: "Singapore",
      address: {
        doorNumber: address.doorNumber,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country
      }
    });
  };

  return (
    <div className="space-y-4 mt-4 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Branch Name *</label>
          <Input
            placeholder="Enter branch name"
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
          />
        </div>
        <div className="col-span-1">
  <label className="text-sm font-medium text-gray-700 mb-2 block">Logo</label>
  <div className="flex items-center gap-2">
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      className="hidden"
      id="logo-upload"
    />
    
    {newBranch.logo ? (
      <div className="relative">
        <Image
          src={newBranch.logo}
          alt="Logo preview"
          width={40}   
          height={40}  
          className="rounded object-cover border-2 border-gray-200"
/>
        <button
          type="button"
          onClick={removeLogo}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    ) : (
      <label 
        htmlFor="logo-upload" 
        className="cursor-pointer w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center"
        title="Upload Logo"
      >
        <Upload className="w-4 h-4 text-gray-400" />
      </label>
    )}
  </div>
</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Branch Code *</label>
          <Input
            placeholder="e.g., BR004"
            value={newBranch.code}
            onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Location *</label>
          <Input
            placeholder="Enter location (e.g., Singapore, Chennai, etc.)"
            value={newBranch.location}
            onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
          />
        </div>
      </div>
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Address Details</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="text-xs text-gray-600 mb-1 block">Door Number *</label>
            <Input
              placeholder="e.g., 123, A-1"
              value={newBranch.address.doorNumber}
              onChange={(e) => updateAddressField("doorNumber", e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-gray-600 mb-1 block">Postal Code</label>
            <Input
              placeholder="e.g., 048616"
              value={newBranch.address.postalCode}
              onChange={(e) => updateAddressField("postalCode", e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-3">
          <label className="text-xs text-gray-600 mb-1 block">Street Address *</label>
          <Input
            placeholder="e.g., Main Street, Raffles Place"
            value={newBranch.address.street}
            onChange={(e) => updateAddressField("street", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">City *</label>
            <Input
              placeholder="e.g., Singapore"
              value={newBranch.address.city}
              onChange={(e) => updateAddressField("city", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">State/Province</label>
            <Input
              placeholder="e.g., Central Area"
              value={newBranch.address.state}
              onChange={(e) => updateAddressField("state", e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-3">
          <label className="text-xs text-gray-600 mb-1 block">Country *</label>
          <Input
            placeholder="e.g., Singapore"
            value={newBranch.address.country}
            onChange={(e) => updateAddressField("country", e.target.value)}
          />
        </div>
        {newBranch.location.toLowerCase().includes("singapore") && (
          <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-2">Singapore Address Suggestions:</p>
            <div className="space-y-2">
              {singaporeAddresses.map((address, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => fillSingaporeAddress(address)}
                  className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded border border-blue-200"
                >
                  <div className="font-medium">{address.doorNumber} {address.street}</div>
                  <div className="text-gray-500">{address.city}, {address.postalCode}</div>
                </button>
              ))}
            </div>
          </div>
        )}
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
          disabled={!newBranch.name || !newBranch.code || !newBranch.location || 
                   !newBranch.address.doorNumber || !newBranch.address.street || 
                   !newBranch.address.city || !newBranch.address.country}
        >
          Create Branch
        </Button>
      </div>
    </div>
  );
}