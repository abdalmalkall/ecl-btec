import { Calendar, BookOpen, Trophy, TrendingUp, FileText, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock data - في التطبيق الحقيقي سيأتي من قاعدة البيانات
  const stats = {
    totalResources: 124,
    completedAssignments: 8,
    currentGPA: 82.5,
    studyHours: 45,
  };
const recentActivities = [
  {
    id: 1,
    type: "download",
    title: "تم تحميل: مقدمة في إدارة الأعمال",
    time: "منذ ساعتين",
    icon: FileText,
  },
  {
    id: 2,
    type: "assignment",
    title: "تم تسليم واجب المحاسبة المالية",
    time: "منذ 3 ساعات",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "quiz",
    title: "اختبار التسويق الرقمي - 85%",
    time: "أمس",
    icon: Trophy,
  },
  {
    id: 4,
    type: "resource",
    title: "مورد جديد: إدارة الموارد البشرية المتقدمة",
    time: "أمس",
    icon: BookOpen,
  },
];

const upcomingAssignments = [
  {
    id: 1,
    title: "مشروع خطة أعمال لشركة ناشئة",
    subject: "إدارة الأعمال",
    dueDate: "2024-01-20",
    status: "قيد العمل",
    progress: 60,
  },
  {
    id: 2,
    title: "تقرير التحليل المالي السنوي",
    subject: "المحاسبة",
    dueDate: "2024-01-25",
    status: "لم يبدأ",
    progress: 0,
  },
  {
    id: 3,
    title: "اختبار استراتيجيات التسويق",
    subject: "التسويق",
    dueDate: "2024-01-22",
    status: "مكتمل",
    progress: 100,
  },
];

const subjectProgress = [
  { name: "إدارة الأعمال", progress: 85, color: "bg-blue-500" },
  { name: "المحاسبة", progress: 70, color: "bg-green-500" },
  { name: "التسويق", progress: 90, color: "bg-purple-500" },
  { name: "الموارد البشرية", progress: 65, color: "bg-orange-500" },
];


  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد العمل":
        return "bg-blue-100 text-blue-800";
      case "لم يبدأ":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            مرحباً بك، أحمد! 👋
          </h1>
          <p className="text-muted-foreground">
            إليك نظرة سريعة على تقدمك الأكاديمي
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-primary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">إجمالي الموارد</p>
                  <p className="text-2xl font-bold">{stats.totalResources}</p>
                </div>
                <BookOpen className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-secondary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">الواجبات المكتملة</p>
                  <p className="text-2xl font-bold">{stats.completedAssignments}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-accent text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">المعدل الحالي</p>
                  <p className="text-2xl font-bold">{stats.currentGPA}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">ساعات الدراسة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.studyHours}</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>النشاطات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <activity.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Assignments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>الواجبات القادمة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAssignments.map((assignment) => {
                  const daysLeft = getDaysUntilDue(assignment.dueDate);
                  return (
                    <div key={assignment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.subject}
                          </p>
                        </div>
                        <div className="text-left">
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {daysLeft > 0 ? `${daysLeft} أيام متبقية` : 
                             daysLeft === 0 ? 'اليوم' : 'متأخر'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subject Progress */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>تقدم المواد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="15.915"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-muted"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="15.915"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${subject.progress} ${100 - subject.progress}`}
                        className={subject.color.replace('bg-', 'text-')}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{subject.progress}%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground">{subject.name}</h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            إجراءات سريعة
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-hero">
              تصفح الموارد
            </Button>
            <Button variant="outline">
              احسب المعدل
            </Button>
            <Button variant="outline">
              اختبار سريع
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;