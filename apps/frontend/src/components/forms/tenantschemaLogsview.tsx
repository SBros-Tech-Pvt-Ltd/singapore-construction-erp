"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, CheckCircle, AlertTriangle, AlertCircle, Database, RefreshCw, Link } from 'lucide-react';

interface TenantSchemaLogsViewProps {
  tenant: {
    tenantName: string;
    schemaName: string;
    dbStatus: string;
    lastSync: string;
    connection: string;
    logs: Array<{
      timestamp: string;
      event: string;
      status: string;
      details: string;
    }>;
  };
  onClose: () => void;
}

export default function TenantSchemaLogsView({ tenant, onClose }: TenantSchemaLogsViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="text-green-600 dark:text-green-400" size={20} />;
      case "Warning":
        return <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={20} />;
      case "Error":
        return <AlertCircle className="text-red-600 dark:text-red-400" size={20} />;
      default:
        return null;
    }
  };

  const handleDownloadLogs = () => {
    const logsText = tenant.logs
      .map(log => `[${log.timestamp}] ${log.status}: ${log.event} - ${log.details}`)
      .join('\n');
    
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tenant.schemaName}_logs.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-l-green-400 dark:border-l-green-500";
      case "Warning":
        return "bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-l-yellow-400 dark:border-l-yellow-500";
      case "Error":
        return "bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-l-red-400 dark:border-l-red-500";
      default:
        return "bg-gray-100/80 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-l-gray-400";
    }
  };

  const getDbStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 dark:text-green-400";
      case "Warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "Error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getConnectionColor = (connection: string) => {
    switch (connection) {
      case "Connected":
        return "text-green-600 dark:text-green-400";
      case "Retry":
        return "text-yellow-600 dark:text-yellow-400";
      case "Reconnect":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getCardGradient = (type: 'database' | 'sync' | 'connection') => {
    switch (type) {
      case 'database':
        return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800";
      case 'sync':
        return "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800";
      case 'connection':
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-800";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/10 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Database className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{tenant.tenantName}</h2>
              <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
                Schema: 
                <code className="bg-muted/50 px-2 py-1 rounded-md text-sm font-mono border">
                  {tenant.schemaName}
                </code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Enhanced Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${getCardGradient('database')}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Database className="text-blue-600 dark:text-blue-400" size={18} />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Database Status</p>
              </div>
              <p className={`text-lg font-bold ${getDbStatusColor(tenant.dbStatus)}`}>
                {tenant.dbStatus}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${getCardGradient('sync')}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <RefreshCw className="text-purple-600 dark:text-purple-400" size={18} />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Last Sync</p>
              </div>
              <p className="text-lg font-bold text-foreground">{tenant.lastSync}</p>
            </div>

            <div className={`p-4 rounded-xl border ${getCardGradient('connection')}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Link className="text-emerald-600 dark:text-emerald-400" size={18} />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Connection Status</p>
              </div>
              <p className={`text-lg font-bold ${getConnectionColor(tenant.connection)}`}>
                {tenant.connection}
              </p>
            </div>
          </div>

          {/* Activity Logs Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/10 rounded-xl border border-border p-1">
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Activity Logs</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Recent activities and events for this schema
                  </p>
                </div>
                <Button
                  onClick={handleDownloadLogs}
                  variant="outline"
                  className="flex items-center gap-2 bg-background hover:bg-muted/50">
                  <Download size={16} />
                  Download Logs
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {tenant.logs.map((log, index) => (
                  <div
                    key={index}
                    className={`bg-background p-4 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow ${getStatusClasses(log.status)}`}>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex-shrink-0">
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <p className="font-semibold text-foreground text-base">{log.event}</p>
                          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md whitespace-nowrap">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {log.details}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(log.status)}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Footer buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Total logs: <span className="font-semibold text-foreground">{tenant.logs.length}</span>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={onClose} 
                variant="outline" 
                className="min-w-24 hover:bg-muted/50">
                Close
              </Button>
              <Button 
                className="min-w-32 bg-blue-600 hover:bg-blue-700 text-white">
                <RefreshCw size={16} className="mr-2" />
                Reconnect Schema
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
