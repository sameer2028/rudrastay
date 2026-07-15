"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api-client";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, admin, isLoading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!isLoading && admin) {
      router.push("/admin");
    }
  }, [admin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.data);
        router.push("/admin");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        "Failed to authenticate. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gold-light/20">
        <div className="bg-warm-brown p-8 text-center">
          <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Lock className="w-6 h-6 text-gold-light" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gold-light text-sm">Sign in to manage Rudra Stay</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-sand/50 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold focus:bg-white transition-colors text-warm-brown"
                  placeholder="admin@rudrastay.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-sand/50 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold focus:bg-white transition-colors text-warm-brown"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-center justify-center text-sm mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
