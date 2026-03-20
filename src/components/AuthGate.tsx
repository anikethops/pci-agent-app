import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function AuthGate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSignUp() {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    setMessage(error ? error.message : 'Signup submitted. Check your email if confirmation is enabled.');
  }

  async function handleSignIn() {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setMessage(error ? error.message : 'Signed in.');
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-eyebrow">PCI Helpdesk</div>
        <h1>Agent Web App</h1>
        <p>Sign in first. This starter already supports Supabase auth, cloud-synced data, and local backup.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <div className="auth-actions">
          <button disabled={loading} onClick={handleSignIn}>Sign in</button>
          <button disabled={loading} className="secondary" onClick={handleSignUp}>Sign up</button>
        </div>
        {message && <div className="auth-message">{message}</div>}
      </div>
    </div>
  );
}
