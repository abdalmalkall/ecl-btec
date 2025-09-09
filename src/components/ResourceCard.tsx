import { FileText, Download, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  title: string;
  subject: string;
  unit: string;
  type: "pdf" | "video" | "doc";
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  description: string;
  tags: string[];
}

const ResourceCard = ({
  title,
  subject,
  unit,
  type,
  fileSize,
  uploadDate,
  uploadedBy,
  description,
  tags,
}: ResourceCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "video":
        return <div className="w-5 h-5 bg-red-500 rounded-sm" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800";
      case "video":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="resource-card group cursor-pointer">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-muted">
          {getTypeIcon(type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <Badge className={getTypeColor(type)}>
          {type.toUpperCase()}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline">
          {subject}
        </Badge>
        <Badge variant="outline">
          {unit}
        </Badge>
        {tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {uploadDate}
        </div>
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {uploadedBy}
        </div>
        <div className="text-xs">
          {fileSize}
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <Eye className="w-4 h-4 ml-2" />
          اقرأ الآن
        </Button>
        <Button size="sm" className="flex-1 gradient-primary text-white">
          <Download className="w-4 h-4 ml-2" />
          حمّل الملف
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;