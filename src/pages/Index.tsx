import { Link } from "react-router-dom";
import { BookOpen, Calculator, Users, TrendingUp, Download, Star, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  // Featured resources data
  const featuredResources = [
    {
      title: "مقدمة في البرمجة - الأساسيات",
      subject: "البرمجة",
      unit: "الوحدة 1",
      type: "pdf" as const,
      fileSize: "2.1 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "د. أحمد محمد",
      description: "تعلم أساسيات البرمجة والمفاهيم الأساسية للخوارزميات",
      tags: ["أساسيات", "برمجة", "خوارزميات"]
    },
    {
      title: "شبكات الحاسوب - المحاضرة الأولى",
      subject: "الشبكات",
      unit: "الوحدة 1",
      type: "video" as const,
      fileSize: "45 MB",
      uploadDate: "2024-01-14",
      uploadedBy: "د. سارة أحمد",
      description: "شرح مفصل لأنواع الشبكات وبروتوكولات الاتصال",
      tags: ["شبكات", "اتصالات", "بروتوكولات"]
    },
    {
      title: "تطوير المواقع - HTML & CSS",
      subject: "تطوير الويب",
      unit: "الوحدة 2",
      type: "pdf" as const,
      fileSize: "3.2 MB",
      uploadDate: "2024-01-13",
      uploadedBy: "أ. محمد علي",
      description: "دليل شامل لتعلم HTML و CSS من البداية",
      tags: ["HTML", "CSS", "ويب"]
    }
  ];

  const stats = [
    { label: "موارد تعليمية", value: "500+", icon: BookOpen },
    { label: "طلاب مسجلين", value: "1,200+", icon: Users },
    { label: "مدرسين", value: "50+", icon: Star },
    { label: "معدل النجاح", value: "95%", icon: TrendingUp },
  ];

  const features = [
    {
      title: "مكتبة شاملة للموارد",
      description: "آلاف الكتب والملفات والفيديوهات التعليمية لجميع المواد",
      icon: BookOpen,
      color: "gradient-primary"
    },
    {
      title: "حاسبة المعدل الذكية",
      description: "احسب معدلك الأكاديمي واحصل على تحليل مفصل لأدائك",
      icon: Calculator,
      color: "gradient-secondary"
    },
    {
      title: "لوحة تحكم شخصية",
      description: "تتبع تقدمك ومواعيدك وواجباتك في مكان واحد",
      icon: Users,
      color: "gradient-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            منصة BTEC التعليمية
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            كل ما تحتاجه لدراستك في مكان واحد - موارد تعليمية، حاسبة المعدل، واختبارات تدريبية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="btn-hero text-lg px-8 py-4 shadow-elegant hover:shadow-xl transition-all duration-300"
            >
              <Link to="/resources">
                استكشف الموارد
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
            >
              <Link to="/calculator">
                احسب معدلك
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              لماذا تختار منصة BTEC؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نوفر لك أدوات متطورة وموارد شاملة لتحقيق أفضل النتائج الأكاديمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className={`w-20 h-20 mx-auto mb-4 ${feature.color} rounded-2xl flex items-center justify-center`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                الموارد المميزة
              </h2>
              <p className="text-lg text-muted-foreground">
                أحدث وأهم الموارد التعليمية المضافة حديثاً
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/resources">
                عرض جميع الموارد
                <ArrowLeft className="mr-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <ResourceCard
                key={index}
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

          <div className="text-center mt-8 sm:hidden">
            <Button asChild variant="outline">
              <Link to="/resources">
                عرض جميع الموارد
                <ArrowLeft className="mr-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ابدأ رحلتك التعليمية اليوم
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            انضم إلى آلاف الطلاب الذين يحققون النجاح مع منصة BTEC التعليمية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
            >
              <Link to="/dashboard">
                ابدأ الآن مجاناً
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              <Link to="/resources">
                تصفح الموارد
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">BTEC Academy</h3>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                منصة تعليمية شاملة توفر أفضل الموارد والأدوات للطلاب لتحقيق النجاح الأكاديمي
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/resources" className="hover:text-white transition-colors">الموارد التعليمية</Link></li>
                <li><Link to="/calculator" className="hover:text-white transition-colors">حاسبة المعدل</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">لوحة المعلومات</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BTEC Academy. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;