import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [ok, setOk] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setOk("");
        if (!email || !password) {
            setError("Email and Password are required.");
            return;
        }
        setBusy(true);
        try {
            const res = await fetch("/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email: email, Password: password })
            });

            const data = await res.json();
            if (!res.ok || !data.Success) {
                setError(data?.Message || "Login failed.");
            } else {
                localStorage.setItem("token", data.Token);
                setOk("Logged in! (fake token stored)");
            }
        } catch {
            setError("Network error.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="login-box" role="main" aria-labelledby="login-title">
            <h2 id="login-title">Login</h2>

            {error && <div className="alert error" role="alert">{error}</div>}
            {ok && <div className="alert success" role="status">{ok}</div>}

            <form onSubmit={onSubmit} noValidate>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                    <input
                        id="password"
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        aria-label={show ? "Hide password" : "Show password"}
                        onClick={() => setShow((s) => !s)}
                    >
                        {show ? "Hide" : "Show"}
                    </button>
                </div>

                <button type="submit" disabled={busy}>
                    {busy ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="hint">Try <code>demo@site.com</code> / <code>Pass@123</code></p>
        </div>
    );
}
