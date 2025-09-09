import { useState } from "react";
import { Plus, Trash2, Calculator as CalcIcon, TrendingUp, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Subject {
  id: number;
  name: string;
  grade: number;
  maxGrade: number;
  weight: number;
}

const Calculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "البرمجة", grade: 85, maxGrade: 100, weight: 1 },
    { id: 2, name: "الرياضيات", grade: 78, maxGrade: 100, weight: 1 },
  ]);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now(),
      name: "",
      grade: 0,
      maxGrade: 100,
      weight: 1,
    };
    setSubjects([...subjects, newSubject]);
  };

  const updateSubject = (id: number, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const calculateGPA = () => {
    if (subjects.length === 0) return 0;
    
    const totalWeightedGrades = subjects.reduce((sum, subject) => {
      const percentage = (subject.grade / subject.maxGrade) * 100;
      return sum + (percentage * subject.weight);
    }, 0);
    
    const totalWeight = subjects.reduce((sum, subject) => sum + subject.weight, 0);
    
    return totalWeight > 0 ? totalWeightedGrades / totalWeight : 0;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "ممتاز", class: "bg-green-100 text-green-800" };
    if (percentage >= 80) return { label: "جيد جداً", class: "bg-blue-100 text-blue-800" };
    if (percentage >= 70) return { label: "جيد", class: "bg-yellow-100 text-yellow-800" };
    if (percentage >= 60) return { label: "مقبول", class: "bg-orange-100 text-orange-800" };
    return { label: "ضعيف", class: "bg-red-100 text-red-800" };
  };

  const gpa = calculateGPA();
  const gradeBadge = getGradeBadge(gpa);

  const getAnalysis = () => {
    const strongSubjects = subjects.filter(s => (s.grade / s.maxGrade) * 100 >= 80);
    const weakSubjects = subjects.filter(s => (s.grade / s.maxGrade) * 100 < 70);
    
    return {
      strong: strongSubjects,
      weak: weakSubjects,
    };
  };

  const analysis = getAnalysis();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            حاسبة المعدل
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            احسب معدلك الأكاديمي بسهولة واحصل على تحليل مفصل لأدائك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="w-5 h-5" />
                  إدخال الدرجات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-muted rounded-lg">
                    <Input
                      placeholder="اسم المادة"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="الدرجة"
                      min="0"
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, 'grade', Number(e.target.value))}
                      className="w-full sm:w-24"
                    />
                    <Input
                      type="number"
                      placeholder="الحد الأقصى"
                      min="1"
                      value={subject.maxGrade}
                      onChange={(e) => updateSubject(subject.id, 'maxGrade', Number(e.target.value))}
                      className="w-full sm:w-24"
                    />
                    <Input
                      type="number"
                      placeholder="الوزن"
                      min="0.1"
                      step="0.1"
                      value={subject.weight}
                      onChange={(e) => updateSubject(subject.id, 'weight', Number(e.target.value))}
                      className="w-full sm:w-20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubject(subject.id)}
                      className="w-full sm:w-auto text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                
                <Button onClick={addSubject} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مادة جديدة
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* GPA Card */}
            <Card className="text-center gradient-hero text-white">
              <CardHeader>
                <CardTitle className="text-white">المعدل العام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {gpa.toFixed(2)}%
                </div>
                <Badge className={gradeBadge.class}>
                  {gradeBadge.label}
                </Badge>
              </CardContent>
            </Card>

            {/* Subject Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>تفصيل المواد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map((subject) => {
                  const percentage = (subject.grade / subject.maxGrade) * 100;
                  return (
                    <div key={subject.id} className="flex justify-between items-center">
                      <span className="font-medium">
                        {subject.name || "مادة غير محددة"}
                      </span>
                      <div className="text-left">
                        <span className={`font-bold ${getGradeColor(percentage)}`}>
                          {percentage.toFixed(1)}%
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {subject.grade}/{subject.maxGrade}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Analysis */}
            {subjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>تحليل الأداء</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.strong.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">المواد القوية</span>
                      </div>
                      <div className="space-y-1">
                        {analysis.strong.map((subject) => (
                          <div key={subject.id} className="text-sm text-muted-foreground">
                            • {subject.name} ({((subject.grade / subject.maxGrade) * 100).toFixed(1)}%)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.weak.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-600">تحتاج تحسين</span>
                      </div>
                      <div className="space-y-1">
                        {analysis.weak.map((subject) => (
                          <div key={subject.id} className="text-sm text-muted-foreground">
                            • {subject.name} ({((subject.grade / subject.maxGrade) * 100).toFixed(1)}%)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">نصائح للتحسين:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• راجع المواد التي تحتاج تحسين</li>
                      <li>• اطلب المساعدة من المعلمين</li>
                      <li>• استخدم الموارد التعليمية المتاحة</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;