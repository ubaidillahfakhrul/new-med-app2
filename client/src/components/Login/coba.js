const login = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!res.ok) {
        // Jika respons dari server bukan 200-an
        const errorRes = await res.json();
        if (errorRes.errors) {
          for (const error of errorRes.errors) {
            alert(error.msg);
          }
        } else {
          alert(errorRes.error || "Terjadi kesalahan saat login.");
        }
        return;
      }
  
      const json = await res.json();
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } else {
        alert("Login gagal. Token tidak diterima.");
      }
    } catch (error) {
      // Tangkap error jaringan (misal backend belum jalan)
      console.error("Login error:", error);
      alert("Gagal login: Tidak bisa terhubung ke server. Pastikan backend sedang aktif.");
    }
  };