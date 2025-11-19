import React, { useState } from 'react';
import FormInput from '../components/FormInput';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.0.0.76:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg">Login</button>
      </form>
    </div>
  );
}
