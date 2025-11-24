import React, { useState } from 'react';
import TelegramAuth from '@/features/auth/components/TelegramButton';
import { 
    BookOpen, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
// --- Login Page Component ---

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login with:', email, password);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* Decorative Background Blobs (Matching Dashboard Style) */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 relative z-10">
                
                {/* Header / Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
                    <p className="text-slate-500">Please enter your details to sign in.</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="space-y-5">
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800 placeholder:text-slate-400"
                                placeholder="student@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center ml-1">
                        <label className="flex items-center cursor-pointer relative">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center text-white">
                                <CheckCircle2 className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100" />
                            </div>
                            <span className="ml-2 text-sm text-slate-500">Remember me for 30 days</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-full font-bold hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center group"
                    >
                        Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-slate-400 font-medium tracking-wider">Or continue with</span>
                    </div>
                </div>

                {/* Telegram Auth Button */}
                <div className="mb-8 flex justify-center">
                    <TelegramAuth
                        botName="QuizzzzzMaster_Bot"
                        authUrl="http://localhost:8000/auth/telegram/callback"
                    />
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
}