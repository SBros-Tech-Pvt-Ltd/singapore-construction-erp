"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TenantDetailsViewProps {
  tenant: {
    name: string;
    owner: string;
    status: string;
    plan: string;
    start: string;
    end: string;
    uen?: string;
    gstRegistered?: string;
    fullName?: string;
    designation?: string;
    email?: string;
    mobile?: string;
    officeNumber?: string;
    address?: {
      blockHouse?: string;
      streetName?: string;
      buildingName?: string;
      unitNumber?: string;
      postalCode?: string;
    };
    businessDetails?: {
      industry?: string;
      companySize?: string;
      yearEstablished?: string;
      logo?: string;
    };
    subscription?: {
      plan?: string;
      billingCycle?: string;
      startDate?: string;
    };
    banking?: {
      bankName?: string;
      accountNumber?: string;
    };
    remarks?: string;
  };
  onClose: () => void;
}

export default function TenantDetailsView({
  tenant,
  onClose,
}: TenantDetailsViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background text-foreground rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">{tenant.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Tenant Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tenant.status === "Active"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}>
              {tenant.status}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {tenant.plan}
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-semibold">{tenant.name}</p>
                </div>
                {tenant.uen && (
                  <div>
                    <p className="text-sm text-muted-foreground">UEN Number</p>
                    <p className="font-semibold">{tenant.uen}</p>
                  </div>
                )}
                {tenant.gstRegistered && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      GST Registered
                    </p>
                    <p className="font-semibold">{tenant.gstRegistered}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Primary Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner Email</p>
                  <p className="font-semibold">{tenant.owner}</p>
                </div>
                {tenant.fullName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-semibold">{tenant.fullName}</p>
                  </div>
                )}
                {tenant.designation && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Designation
                    </p>
                    <p className="font-semibold">{tenant.designation}</p>
                  </div>
                )}
                {tenant.mobile && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Mobile Number
                    </p>
                    <p className="font-semibold">{tenant.mobile}</p>
                  </div>
                )}
                {tenant.officeNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Office Number
                    </p>
                    <p className="font-semibold">{tenant.officeNumber}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {tenant.address && (
            <Card>
              <CardHeader>
                <CardTitle>Registered Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  {tenant.address.blockHouse && `${tenant.address.blockHouse}, `}
                  {tenant.address.streetName && `${tenant.address.streetName}`}
                  {tenant.address.buildingName && (
                    <>
                      <br />
                      {tenant.address.buildingName}
                    </>
                  )}
                  {tenant.address.unitNumber && (
                    <>
                      <br />
                      {tenant.address.unitNumber}
                    </>
                  )}
                  {tenant.address.postalCode && (
                    <>
                      <br />
                      Singapore {tenant.address.postalCode}
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          )}

          {tenant.businessDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tenant.businessDetails.industry && (
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-semibold capitalize">
                        {tenant.businessDetails.industry}
                      </p>
                    </div>
                  )}
                  {tenant.businessDetails.companySize && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Size
                      </p>
                      <p className="font-semibold">
                        {tenant.businessDetails.companySize}
                      </p>
                    </div>
                  )}
                  {tenant.businessDetails.yearEstablished && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Year Established
                      </p>
                      <p className="font-semibold">
                        {tenant.businessDetails.yearEstablished}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-semibold">{tenant.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="font-semibold">
                    {tenant.subscription?.billingCycle || "Monthly"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{tenant.start}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-semibold">{tenant.end}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {tenant.banking &&
            (tenant.banking.bankName || tenant.banking.accountNumber) && (
              <Card>
                <CardHeader>
                  <CardTitle>Banking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tenant.banking.bankName && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Bank Name
                        </p>
                        <p className="font-semibold uppercase">
                          {tenant.banking.bankName}
                        </p>
                      </div>
                    )}
                    {tenant.banking.accountNumber && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Account Number
                        </p>
                        <p className="font-semibold">
                          {tenant.banking.accountNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {tenant.remarks && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Remarks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{tenant.remarks}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
