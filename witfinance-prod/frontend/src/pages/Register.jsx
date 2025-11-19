import React, { useState } from 'react';
import FormInput from '../components/FormInput';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'investor'
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.0.0.76:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      const data = await response.json();
      alert(data.message || 'Registration complete');
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Name" name="name" value={form.name} onChange={handleChange} />
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <select name="role" onChange={handleChange} value={form.role} className="w-full border rounded p-2 mt-2">
          <option value="investor">Investor</option>
          <option value="advisor">Advisor</option>
        </select>
        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">Register</button>
      </form>
    </div>
  );
}
