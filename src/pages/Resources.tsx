import { useState } from "react";
import { Search, Filter, BookOpen, Video, FileText } from "lucide-react";
import Header from "@/components/Header";
import ResourceCard from "@/components/ResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Mock data - في التطبيق الحقيقي سيأتي من قاعدة البيانات
 // Mock data - في التطبيق الحقيقي سيأتي من قاعدة البيانات
const resources = [
  {
    id: 1,
    title: "مقدمة في إدارة الأعمال - الوحدة الأولى",
    subject: "إدارة الأعمال",
    unit: "الوحدة 1",
    type: "pdf" as const,
    fileSize: "2.5 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "د. أحمد محمد",
    description: "شرح أساسيات إدارة الأعمال والمفاهيم الأساسية مثل التخطيط والتنظيم",
    tags: ["أساسيات", "تخطيط", "تنظيم"]
  },
  {
    id: 2,
    title: "المحاسبة المالية - المحاضرة الثانية",
    subject: "المحاسبة",
    unit: "الوحدة 2",
    type: "video" as const,
    fileSize: "45 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "د.  أحمد",
    description: "شرح أساسيات المحاسبة المالية وإعداد القوائم المالية",
    tags: ["محاسبة", "قوائم مالية", "تحليل"]
  },
  {
    id: 3,
    title: "إدارة الموارد البشرية - التخطيط والتوظيف",
    subject: "الموارد البشرية",
    unit: "الوحدة 1",
    type: "pdf" as const,
    fileSize: "3.8 MB",
    uploadDate: "2024-01-13",
    uploadedBy: "أ. محمد علي",
    description: "تعلم أساسيات إدارة الموارد البشرية، التوظيف والتخطيط للموظفين",
    tags: ["HR", "توظيف", "تنمية الموظفين"]
  },
  {
    id: 4,
    title: "التسويق الرقمي - استراتيجيات وحملات",
    subject: "التسويق",
    unit: "الوحدة 3",
    type: "doc" as const,
    fileSize: "1.2 MB",
    uploadDate: "2024-01-12",
    uploadedBy: "د. فاطمة يوسف",
    description: "مقدمة في التسويق الرقمي وكيفية إنشاء الحملات واستهداف العملاء",
    tags: ["تسويق", "استراتيجيات", "حملات"]
  }
];

const subjects = ["إدارة الأعمال", "المحاسبة", "الموارد البشرية", "التسويق"];
const fileTypes = [
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "video", label: "فيديو", icon: Video },
  { value: "doc", label: "مستند", icon: BookOpen }
];


  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            الموارد التعليمية
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استكشف مجموعة شاملة من المواد التعليمية، الكتب، والملفات لجميع المواد الدراسية
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث في الموارد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Subject Filter */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="اختر المادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المواد</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="نوع الملف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(selectedSubject !== "all" || selectedType !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
              {selectedSubject !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  المادة: {selectedSubject}
                  <button
                    onClick={() => setSelectedSubject("all")}
                    className="text-xs hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  النوع: {fileTypes.find(t => t.value === selectedType)?.label}
                  <button
                    onClick={() => setSelectedType("all")}
                    className="text-xs hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  البحث: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredResources.length} مورد متاح
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                subject={resource.subject}
                unit={resource.unit}
                type={resource.type}
                fileSize={resource.fileSize}
                uploadDate={resource.uploadDate}
                uploadedBy={resource.uploadedBy}
                description={resource.description}
                tags={resource.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لا توجد موارد
            </h3>
            <p className="text-muted-foreground">
              لم نجد أي موارد تطابق معايير البحث الخاصة بك
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("all");
                setSelectedType("all");
              }}
              className="mt-4"
              variant="outline"
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;