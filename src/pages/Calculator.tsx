import { useState } from "react";
import { Plus, Trash2, Calculator, TrendingUp, TrendingDown } from "lucide-react";

interface Subject {
  id: number;
  name: string;
  grade: number;
  maxGrade: number;
  weight: number;
  type: "مشترك" | "تخصص";
}

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "البرمجة", grade: 85, maxGrade: 100, weight: 1, type: "تخصص" },
    { id: 2, name: "الرياضيات", grade: 78, maxGrade: 100, weight: 1, type: "مشترك" },
  ]);

  // دالة لتحويل العلامة إلى BTEC أو 100% للمواد المشتركة
  const getGrade = (percentage: number, type: string) => {
    if (type === "مشترك") return "100%";
    if (percentage >= 80) return "D";
    if (percentage >= 60) return "M";
    if (percentage >= 40) return "P";
    return "F";
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now(),
      name: "",
      grade: 0,
      maxGrade: 100,
      weight: 1,
      type: "تخصص",
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

  const gpa = calculateGPA();

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">حاسبة المعدل الأكاديمي BTEC</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              احسب معدلك الأكاديمي بسهولة مع نظام الدرجات BTEC (P / M / D)
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                  <Calculator className="w-5 h-5" />
                  إدخال الدرجات
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {subjects.map((subject) => {
                  const percentage = subject.maxGrade > 0 ? (subject.grade / subject.maxGrade) * 100 : 0;
                  const grade = getGrade(percentage, subject.type);

                  return (
                    <div key={subject.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {/* نوع المادة */}
                      <select
                        value={subject.type}
                        onChange={(e) => updateSubject(subject.id, "type", e.target.value)}
                        className="w-full sm:w-28 rounded-md border px-2 py-2"
                      >
                        <option value="مشترك">مشترك</option>
                        <option value="تخصص">تخصص</option>
                      </select>

                      <input
                        type="text"
                        placeholder="اسم المادة"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="الدرجة"
                        min="0"
                        value={subject.grade || ""}
                        onChange={(e) => updateSubject(subject.id, "grade", Number(e.target.value) || 0)}
                        className="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="الحد الأقصى"
                        min="1"
                        value={subject.maxGrade || ""}
                        onChange={(e) => updateSubject(subject.id, "maxGrade", Number(e.target.value) || 100)}
                        className="w-full sm:w-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="الوزن"
                        min="0.1"
                        step="0.1"
                        value={subject.weight || ""}
                        onChange={(e) => updateSubject(subject.id, "weight", Number(e.target.value) || 1)}
                        className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      {/* عرض النسبة والحرف */}
                      <div className="flex flex-col justify-center items-center px-4 bg-white rounded-md border border-gray-300 min-w-[90px]">
                        <span className="text-sm font-semibold text-gray-700">{percentage.toFixed(1)}%</span>
                        <span className="text-lg font-bold text-blue-600">{grade}</span>
                      </div>

                      <button
                        onClick={() => removeSubject(subject.id)}
                        className="w-full sm:w-auto px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={addSubject}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  إضافة مادة جديدة
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* GPA Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg">
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">المعدل العام</h3>
                <div className="text-4xl font-bold mb-3">
                  {gpa.toFixed(2)}%
                </div>
                <div className="text-lg font-bold text-yellow-300">
                  {getGrade(gpa, "تخصص")}
                </div>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">تفصيل المواد</h3>
              </div>
              <div className="p-4 space-y-3">
                {subjects.map((subject) => {
                  const percentage = (subject.grade / subject.maxGrade) * 100;
                  const grade = getGrade(percentage, subject.type);
                  return (
                    <div key={subject.id} className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-800">
                        {subject.name || "مادة غير محددة"} ({subject.type})
                      </span>
                      <div className="text-right">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-700">
                            {percentage.toFixed(1)}%
                          </span>
                          <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                            {grade}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {subject.grade}/{subject.maxGrade} (وزن: {subject.weight})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analysis */}
            {subjects.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">تحليل الأداء</h3>
                </div>
                <div className="p-4 space-y-4">
                  {analysis.strong.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">المواد القوية (80%+)</span>
                      </div>
                      <div className="space-y-1">
                        {analysis.strong.map((subject) => (
                          <div key={subject.id} className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                            • {subject.name} - {((subject.grade / subject.maxGrade) * 100).toFixed(1)}% ({getGrade((subject.grade / subject.maxGrade) * 100, subject.type)})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.weak.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-600">تحتاج تحسين (أقل من 70%)</span>
                      </div>
                      <div className="space-y-1">
                        {analysis.weak.map((subject) => (
                          <div key={subject.id} className="text-sm text-gray-600 bg-orange-50 p-2 rounded">
                            • {subject.name} - {((subject.grade / subject.maxGrade) * 100).toFixed(1)}% ({getGrade((subject.grade / subject.maxGrade) * 100, subject.type)})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3 text-gray-800">دليل درجات BTEC:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-blue-100 p-2 rounded text-center">
                        <div className="font-bold text-blue-800">D (80-100%)</div>
                        <div className="text-blue-600">امتياز</div>
                      </div>
                      <div className="bg-yellow-100 p-2 rounded text-center">
                        <div className="font-bold text-yellow-800">M (60-79%)</div>
                        <div className="text-yellow-600">جدارة</div>
                      </div>
                      <div className="bg-orange-100 p-2 rounded text-center">
                        <div className="font-bold text-orange-800">P (40-59%)</div>
                        <div className="text-orange-600">اجتياز</div>
                      </div>
                      <div className="bg-red-100 p-2 rounded text-center col-span-2">
                        <div className="font-bold text-red-800">F (أقل من 40%)</div>
                        <div className="text-red-600">راسب</div>
                      </div>
                      <div className="bg-green-100 p-2 rounded text-center col-span-2">
                        <div className="font-bold text-green-800">المواد المشتركة = 100%</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <h4 className="font-medium mb-2 text-gray-800">نصائح للتحسين:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ركز على المواد التي تحصل فيها على درجة أقل من 70%</li>
                      <li>• اطلب المساعدة من المعلمين في المواد الضعيفة</li>
                      <li>• استخدم الموارد التعليمية المتاحة</li>
                      <li>• خصص وقتاً إضافياً للمراجعة والممارسة</li>
                      <li>• حاول الوصول إلى D في جميع المواد التخصصية</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;
