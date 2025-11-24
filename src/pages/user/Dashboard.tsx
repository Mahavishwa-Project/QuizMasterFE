import React, { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Trophy,
    BarChart2,
    Settings,
    Bell,
    Search,
    Menu,
    ChevronRight,
    Play,
    Clock,
    Flame,
    Star,
    Zap,
    AlertCircle
} from 'lucide-react';

// --- Types ---
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
    color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

interface QuizCardProps {
    title: string;
    category: string;
    questions: number;
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    progress?: number;
    imageColor: string;
}

// --- Components ---

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, color }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        rose: 'bg-rose-50 text-rose-600',
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className={`font-medium ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trend}
                    </span>
                    <span className="text-slate-400 ml-2">vs last week</span>
                </div>
            )}
        </div>
    );
};

const QuizCard: React.FC<QuizCardProps> = ({ title, category, questions, duration, difficulty, progress, imageColor }) => {
    const difficultyColors = {
        Easy: 'text-emerald-500 bg-emerald-50',
        Medium: 'text-amber-500 bg-amber-50',
        Hard: 'text-rose-500 bg-rose-50',
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group cursor-pointer">
            <div className={`h-32 ${imageColor} relative`}>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                    {category}
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>
                        {difficulty}
                    </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {questions} Qs
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {duration}
                    </div>
                </div>

                {progress !== undefined ? (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700">In Progress</span>
                            <span className="text-indigo-600 font-bold">{progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center">
                            Continue <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                ) : (
                    <button className="w-full mt-2 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-50">
                        Start Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </div>
);

// --- Main App Component ---

export function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6">
                    <div className="flex items-center space-x-2 mb-10">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            QuizMaster
                        </span>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
                        <SidebarItem icon={<BookOpen className="w-5 h-5" />} label="My Library" />
                        <SidebarItem icon={<Trophy className="w-5 h-5" />} label="Leaderboard" />
                        <SidebarItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" />
                        <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
                    </nav>

                    {/* Premium Card in Sidebar */}
                    <div className="mt-10 p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
                                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                            </div>
                            <h4 className="font-bold mb-1">Go Pro</h4>
                            <p className="text-indigo-100 text-xs mb-3">Unlock unlimited quizzes & advanced stats.</p>
                            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full">

                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-800">Alex Morgan</p>
                                <p className="text-xs text-slate-500">Student Account</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                <span className="font-bold text-indigo-600">AM</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 w-full space-y-8">

                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, Alex! 👋</h1>
                            <p className="text-slate-500">You've completed <span className="font-bold text-indigo-600">80%</span> of your weekly goal. Keep it up!</p>
                        </div>

                        <div className="relative z-10 flex items-center mt-4 md:mt-0 space-x-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <div className="flex items-center px-3">
                                <Flame className="w-5 h-5 text-orange-500 mr-2 fill-orange-500" />
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Streak</p>
                                    <p className="text-lg font-bold text-slate-800">12 Days</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center px-3">
                                <Zap className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tokens</p>
                                    <p className="text-lg font-bold text-slate-800">2,450</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Quizzes Taken"
                            value="24"
                            icon={<BookOpen className="w-6 h-6" />}
                            color="indigo"
                            trend="+3"
                            trendUp={true}
                        />
                        <StatCard
                            title="Avg. Score"
                            value="86%"
                            icon={<Trophy className="w-6 h-6" />}
                            color="emerald"
                            trend="+2.4%"
                            trendUp={true}
                        />
                        <StatCard
                            title="Time Spent"
                            value="12h 4m"
                            icon={<Clock className="w-6 h-6" />}
                            color="amber"
                            trend="-40m"
                            trendUp={false}
                        />
                        <StatCard
                            title="Pending Quizzes"
                            value="2"
                            icon={<AlertCircle className="w-6 h-6" />}
                            color="rose"
                        />
                    </div>

                    {/* Main Content Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column (Content) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Continue Learning */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-slate-800">Continue Learning</h2>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-full sm:w-1/3 h-32 bg-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                        <BookOpen className="w-10 h-10 text-indigo-500" />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800">Advanced React Patterns</h3>
                                                <p className="text-sm text-slate-500">Chapter 4: Custom Hooks & Composition</p>
                                            </div>
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                                                Web Dev
                                            </span>
                                        </div>

                                        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 mb-2">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-4">
                                            <span>Progress: 65%</span>
                                            <span>~15 mins left</span>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center">
                                                <Play className="w-4 h-4 mr-2 fill-current" /> Resume Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Recommended Quizzes Grid */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-slate-800">Recommended for You</h2>
                                    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">View All</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <QuizCard
                                        title="Intro to UI Design"
                                        category="Design"
                                        questions={15}
                                        duration="20m"
                                        difficulty="Easy"
                                        imageColor="bg-rose-100"
                                    />
                                    <QuizCard
                                        title="TypeScript Generics"
                                        category="Coding"
                                        questions={10}
                                        duration="15m"
                                        difficulty="Hard"
                                        imageColor="bg-blue-100"
                                    />
                                    <QuizCard
                                        title="World History 101"
                                        category="History"
                                        questions={25}
                                        duration="30m"
                                        difficulty="Medium"
                                        progress={30}
                                        imageColor="bg-amber-100"
                                    />
                                    <QuizCard
                                        title="Chemistry Basics"
                                        category="Science"
                                        questions={20}
                                        duration="25m"
                                        difficulty="Medium"
                                        imageColor="bg-emerald-100"
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Right Column (Sidebar Widgets) */}
                        <div className="space-y-8">

                            {/* Leaderboard Widget */}
                            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800">Top Students</h3>
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 1 ? 'bg-yellow-100 text-yellow-700' : i === 2 ? 'bg-slate-100 text-slate-700' : i === 3 ? 'bg-orange-100 text-orange-700' : 'bg-transparent text-slate-400'}`}>
                                                    {i}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">User {i}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{2500 - (i * 150)} pts</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-2 text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors">
                                    View Full Leaderboard
                                </button>
                            </section>

                            {/* Achievements Widget */}
                            <section className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl shadow-lg p-6 text-white">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <h3 className="font-bold">Latest Badge</h3>
                                </div>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/30">
                                        🎯
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Sharpshooter</p>
                                        <p className="text-indigo-200 text-xs">Score 100% on 3 quizzes</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-indigo-200">
                                        <span>Progress</span>
                                        <span>2/3</span>
                                    </div>
                                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: '66%' }}></div>
                                    </div>
                                </div>
                            </section>

                            {/* Upcoming Events */}
                            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <h3 className="font-bold text-slate-800 mb-4">Upcoming Exams</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 pb-4 border-b border-slate-50">
                                        <div className="flex flex-col items-center bg-indigo-50 px-3 py-1 rounded-lg min-w-[60px]">
                                            <span className="text-xs text-indigo-600 font-bold uppercase">Oct</span>
                                            <span className="text-lg font-bold text-slate-800">24</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Physics Midterm</p>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" /> 10:00 AM
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex flex-col items-center bg-slate-50 px-3 py-1 rounded-lg min-w-[60px]">
                                            <span className="text-xs text-slate-500 font-bold uppercase">Nov</span>
                                            <span className="text-lg font-bold text-slate-800">02</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">History Final</p>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" /> 09:00 AM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}