"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultView?: "login" | "signup";
    onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultView = "login", onSuccess }: AuthModalProps) {
    const [view, setView] = useState<"login" | "signup">(defaultView);

    if (!isOpen) return null;

    const handleSuccess = () => {
        onSuccess?.();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {view === "login" ? (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onSwitchToSignup={() => setView("signup")}
                    />
                ) : (
                    <SignupForm
                        onSuccess={handleSuccess}
                        onSwitchToLogin={() => setView("login")}
                    />
                )}
            </div>
        </div>
    );
}
