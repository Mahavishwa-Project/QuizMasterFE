// TelegramAuth.tsx

import { useEffect, useRef } from "react";

interface TelegramAuthProps {
    botName: string;
    authUrl: string;
    size?: "small" | "medium" | "large";
    showUserPic?: boolean;
}

export default function TelegramAuth({
    botName,
    authUrl,
    size = "large",
    showUserPic = false,
}: TelegramAuthProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing content
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.async = true;
        
        // --- PERBAIKAN DI SINI ---
        // Jangan gunakan authUrl di sini. Gunakan script widget resmi Telegram.
        script.src = "https://telegram.org/js/telegram-widget.js?22"; 
        // -------------------------

        script.setAttribute("data-telegram-login", botName);
        script.setAttribute("data-size", size);
        script.setAttribute("data-userpic", showUserPic.toString());
        
        // URL backend kamu ditaruh di sini (ini sudah benar di kode aslimu)
        script.setAttribute("data-auth-url", authUrl);
        
        script.setAttribute("data-request-access", "write");

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [botName, authUrl, size, showUserPic]);

    return <div ref={containerRef} />;
}