import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/login';

    const fetchPortfolio = async () => {
      try {
        const response = await fetch('http://10.0.0.76:5000/api/portfolio/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!portfolio) return <div className="text-red-500">Failed to load portfolio.</div>;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome, {portfolio.full_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2>Portfolio Value</h2>
          <p className="text-xl text-green-600">${portfolio.total_value.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2>Investments</h2>
          <p className="text-xl">{portfolio.investments.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2>Last Login</h2>
          <p>{new Date(portfolio.last_login).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
