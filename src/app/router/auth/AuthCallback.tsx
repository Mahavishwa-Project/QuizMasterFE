import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil token dari URL
        const token = searchParams.get("token");

        if (token) {
            console.log("Login sukses, token:", token);
            
            // Simpan token (bisa di localStorage atau Cookie)
            localStorage.setItem("accessToken", token);
            
            // Pindahkan user ke halaman utama/dashboard
            navigate("/dashboard"); 
        } else {
            // Jika gagal, kembalikan ke login
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return <div>Loging in... Please wait.</div>;
}