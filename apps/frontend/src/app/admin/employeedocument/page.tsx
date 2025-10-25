"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  FileText, Upload, Clock, FolderOpen, Search, Filter, 
  Download, Eye, Trash2, Calendar, ChevronRight, Save,
  CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface UploadForm {
  employeeName: string;
  employeeId: string;
  documentName: string;
  category: string;
  expiryDate: string;
  file: File | null;
}

interface Document {
  id: number;
  name: string;
  employeeName: string;
  employeeId: string;
  category: string;
  uploadDate: string;
  expiry: string | null;
  size: string;
  status: string;
}

export default function EmployeeDocumentManagement() {
  const [activeTab, setActiveTab] = useState("list");
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: 1, 
      name: "Offer Letter", 
      employeeName: "John Doe",
      employeeId: "EMP001",
      category: "Official", 
      uploadDate: "2024-01-15",
      expiry: null,
      size: "245 KB",
      status: "active"
    },
    { 
      id: 2, 
      name: "Visa Document", 
      employeeName: "Sarah Smith",
      employeeId: "EMP002",
      category: "Legal", 
      uploadDate: "2024-02-10",
      expiry: "2025-12-10",
      size: "1.2 MB",
      status: "expiring"
    },
    { 
      id: 3, 
      name: "Passport Copy", 
      employeeName: "Mike Chen",
      employeeId: "EMP003",
      category: "ID Proof", 
      uploadDate: "2024-03-05",
      expiry: "2028-06-15",
      size: "856 KB",
      status: "active"
    },
    { 
      id: 4, 
      name: "Work Permit", 
      employeeName: "Anna Lee",
      employeeId: "EMP004",
      category: "Legal", 
      uploadDate: "2023-12-20",
      expiry: "2025-01-10",
      size: "512 KB",
      status: "expired"
    },
  ]);

  const categories = [
  { id: 1, name: "Resume", count: 12, color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "ID Proof", count: 8, color: "bg-purple-100 text-purple-700" },
  { id: 3, name: "Official", count: 15, color: "bg-green-100 text-green-700" },
  { id: 4, name: "Legal", count: 6, color: "bg-orange-100 text-orange-700" },
];


  const [uploadForm, setUploadForm] = useState<UploadForm>({
    employeeName: "",
    employeeId: "",
    documentName: "",
    category: "",
    expiryDate: "",
    file: null
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [renewalDate, setRenewalDate] = useState("");



  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const tabOrder = ["list", "upload", "expiry", "category"];
  
  const handleNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handleSave = () => {
    if (activeTab === "upload") {
      console.log("Saving upload form:", uploadForm);
      alert("Document uploaded successfully!");
      setUploadForm({
        employeeName: "",
        employeeId: "",
        documentName: "",
        category: "",
        expiryDate: "",
        file: null
      });
    } else if (activeTab === "category") {
      console.log("Saving category:", newCategory);
      alert("Category saved successfully!");
      setNewCategory({ name: "", description: "" });
    } else if (activeTab === "list") {
      alert("Document list saved!");
    } else if (activeTab === "expiry") {
      alert("Expiry tracker data saved!");
    }
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setViewModalOpen(true);
  };

  const handleRenewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setRenewalDate("");
    setRenewModalOpen(true);
  };

  const handleConfirmRenewal = () => {
    if (!selectedDocument || !renewalDate) {
      alert("Please select a renewal date");
      return;
    }

    setDocuments(documents.map(doc => 
      doc.id === selectedDocument.id 
        ? { ...doc, expiry: renewalDate, status: "active" }
        : doc
    ));

    alert(`Document "${selectedDocument.name}" renewed successfully with new expiry date: ${renewalDate}`);
    setRenewModalOpen(false);
    setSelectedDocument(null);
    setRenewalDate("");
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <Card className="shadow-2xl border-t-4 border-t-blue-500">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 mb-6 bg-gradient-to-r from-gray-100 to-gray-200 p-1.5 rounded-xl">
              <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Document List</span>
                <span className="sm:hidden">List</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">
                <Upload className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Upload</span>
                <span className="sm:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="expiry" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">
                <Clock className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Expiry Tracker</span>
                <span className="sm:hidden">Expiry</span>
              </TabsTrigger>
              <TabsTrigger value="category" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all">
                <FolderOpen className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Categories</span>
                <span className="sm:hidden">Category</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by document name, employee name, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-2 focus:border-blue-400"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48 border-2">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Official">Official</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="ID Proof">ID Proof</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto border-2 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="space-y-3">
                {filteredDocuments.map((doc, index) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-400" style={{ animationDelay: `${index * 50}ms` }}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <FileText className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-lg">{doc.name}</h3>
                            <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-600 flex-wrap">
                              <span className="font-medium">{doc.employeeName}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 font-mono">{doc.employeeId}</span>
                              <span className="text-gray-400">•</span>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 font-semibold">
                                {doc.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden lg:block">
                            <p className="text-xs text-gray-500 font-medium">Upload Date</p>
                            <p className="text-sm font-semibold text-gray-700">{doc.uploadDate}</p>
                          </div>
                          
                          <div className="text-right hidden lg:block">
                            <p className="text-xs text-gray-500 font-medium">Expiry</p>
                            <p className="text-sm font-semibold text-gray-700">
                              {doc.expiry ? (
                                <span className="flex items-center gap-1 justify-end">
                                  <Calendar className="w-3 h-3" />
                                  {doc.expiry}
                                </span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </p>
                          </div>
                          
                          <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-500 font-medium">Size</p>
                            <p className="text-sm font-semibold text-gray-700">{doc.size}</p>
                          </div>
                                                 
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 transition-all"
                              onClick={() => handleViewDocument(doc)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="hover:bg-green-50 hover:text-green-700 hover:border-green-400 transition-all">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="hover:bg-red-50 hover:text-red-700 hover:border-red-400 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:shadow-xl bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-10">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl animate-pulse">
                        <Upload className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Upload Document</h3>
                        <p className="text-sm text-gray-600">Drag and drop or click to browse files</p>
                      </div>
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="file-upload"
                        onChange={(e) => setUploadForm({...uploadForm, file: e.target.files?.[0] || null})}
                      />
                      <Label htmlFor="file-upload">
                        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                          <span>Choose File</span>
                        </Button>
                      </Label>
                      <p className="text-xs text-gray-500">Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Document Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Label className="font-semibold">Employee Name *</Label>
                      <Input 
                        placeholder="Select or enter employee name" 
                        value={uploadForm.employeeName}
                        onChange={(e) => setUploadForm({...uploadForm, employeeName: e.target.value})}
                        className="mt-1 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Employee ID *</Label>
                      <Input 
                        placeholder="e.g., EMP001" 
                        value={uploadForm.employeeId}
                        onChange={(e) => setUploadForm({...uploadForm, employeeId: e.target.value})}
                        className="mt-1 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Document Name *</Label>
                      <Input 
                        placeholder="Enter document name" 
                        value={uploadForm.documentName}
                        onChange={(e) => setUploadForm({...uploadForm, documentName: e.target.value})}
                        className="mt-1 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Category *</Label>
                      <Select value={uploadForm.category} onValueChange={(v) => setUploadForm({...uploadForm, category: v})}>
                        <SelectTrigger className="mt-1 border-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="official">Official</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="id-proof">ID Proof</SelectItem>
                          <SelectItem value="resume">Resume</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold">Expiry Date (Optional)</Label>
                      <Input 
                        type="date" 
                        value={uploadForm.expiryDate}
                        onChange={(e) => setUploadForm({...uploadForm, expiryDate: e.target.value})}
                        className="mt-1 border-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="expiry">
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-6 h-6 text-orange-600" />
                      Document Expiry Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {documents.filter(d => d.expiry).map(doc => {
                     const daysRemaining = Math.floor((new Date(doc.expiry!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                     const priority = daysRemaining < 0 ? "critical" : daysRemaining < 30 ? "high" : "medium";
                      
                      return (
                        <Card key={doc.id} className={`${daysRemaining < 0 ? 'border-l-4 border-l-red-500 bg-red-50' : daysRemaining < 30 ? 'border-l-4 border-l-yellow-500 bg-yellow-50' : 'border-l-4 border-l-green-500 bg-green-50'} hover:shadow-lg transition-all duration-300`}>
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-lg">{doc.name}</h4>
                                <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
                                  <span className="text-gray-700 font-medium">{doc.employeeName}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="flex items-center gap-1 text-gray-700">
                                    <Calendar className="w-4 h-4" />
                                    {doc.expiry}
                                  </span>
                                  <span className="text-gray-400">•</span>
                                  <span className={`font-bold text-base ${daysRemaining < 0 ? "text-red-600" : daysRemaining < 30 ? "text-yellow-600" : "text-green-600"}`}>
                                    {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days remaining`}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {priority === "critical" && <Badge className="bg-red-500 text-white hover:bg-red-600 text-base px-4">Critical</Badge>}
                                {priority === "high" && <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 text-base px-4">High Priority</Badge>}
                                {priority === "medium" && <Badge className="bg-blue-500 text-white hover:bg-blue-600 text-base px-4">Normal</Badge>}
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                  onClick={() => handleRenewDocument(doc)}
                                >
                                  Renew Document
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="category">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-white shadow-lg border-2 border-green-200">
                  <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FolderOpen className="w-6 h-6 text-green-600" />
                      Add New Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-6">
                    <div>
                      <Label className="font-semibold text-base">Category Name *</Label>
                      <Input 
                        placeholder="e.g., Employment Contract, Medical Records" 
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        className="mt-2 border-2 text-base"
                      />
                    </div>
                    <div>
                      <Label className="font-semibold text-base">Description (Optional)</Label>
                      <Input 
                        placeholder="Brief description of this category" 
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        className="mt-2 border-2 text-base"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                      Existing Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                              <FolderOpen className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-base">{cat.name}</p>
                              <p className="text-sm text-gray-600 font-medium">{cat.count} documents</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-400">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <div className="flex items-center justify-between mt-8 pt-6 border-t-2">
              <div className="text-sm text-gray-600">
                <p className="font-medium">Step {tabOrder.indexOf(activeTab) + 1} of {tabOrder.length}</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg px-6"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                {activeTab !== "category" && (
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-6"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Document Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected document
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Document Name</Label>
                  <p className="text-base font-medium">{selectedDocument.name}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Category</Label>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                    {selectedDocument.category}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Employee Name</Label>
                  <p className="text-base font-medium">{selectedDocument.employeeName}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Employee ID</Label>
                  <p className="text-base font-medium font-mono">{selectedDocument.employeeId}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Upload Date</Label>
                  <p className="text-base font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedDocument.uploadDate}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Expiry Date</Label>
                  <p className="text-base font-medium flex items-center gap-1">
                    {selectedDocument.expiry ? (
                      <>
                        <Calendar className="w-4 h-4" />
                        {selectedDocument.expiry}
                      </>
                    ) : (
                      <span className="text-gray-400">No expiry date</span>
                    )}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">File Size</Label>
                  <p className="text-base font-medium">{selectedDocument.size}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Status</Label>
                  <Badge className={
                    selectedDocument.status === "active" ? "bg-green-500" :
                    selectedDocument.status === "expiring" ? "bg-yellow-500" :
                    "bg-red-500"
                  }>
                    {selectedDocument.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-600">Document Preview</Label>
                <div className="mt-2 bg-gray-100 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Document preview not available</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={renewModalOpen} onOpenChange={setRenewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Renew Document
            </DialogTitle>
            <DialogDescription>
              Update the expiry date for this document
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Document</p>
                <p className="text-base font-bold">{selectedDocument.name}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedDocument.employeeName}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Current Expiry Date</Label>
                <p className="text-base font-medium text-gray-700">
                  {selectedDocument.expiry || "No expiry date"}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">New Expiry Date *</Label>
                <Input 
                  type="date" 
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  className="border-2"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                 <AlertCircle className="w-4 h-4 inline mr-1" />
                  The document status will be updated to &quot;Active&quot; after renewal.
                  </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={handleConfirmRenewal}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Renewal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}