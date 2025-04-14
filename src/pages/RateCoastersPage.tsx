import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type Coaster = {
  id: number;
  name: string;
  manufacturer: string;
  type: 'Steel' | 'Wood' | 'Hybrid' | 'Powered';
  park: string;
};

const buttonStyle = {
  backgroundColor: '#444',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
  margin: '0 5px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #444',
  margin: '5px 0',
  width: '100%',
};

const RateCoastersPage: React.FC = () => {
  const [coasters, setCoasters] = useState<Coaster[]>([]);
  const [newCoaster, setNewCoaster] = useState<Partial<Coaster>>({});
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Coaster>>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('top10coasters');
    if (stored) {
      setCoasters(JSON.parse(stored));
    } else {
      setCoasters([]); // Or set default values if needed
    }
  }, []);

  // Update localStorage whenever coasters change
  useEffect(() => {
    if (coasters.length) {
      localStorage.setItem('top10coasters', JSON.stringify(coasters));
    }
  }, [coasters]);

  const addCoaster = () => {
    if (newCoaster.name && newCoaster.manufacturer && newCoaster.type && newCoaster.park) {
      setCoasters((prev) => [
        ...prev,
        { ...newCoaster, id: Date.now() } as Coaster,
      ]);
      setNewCoaster({});
    }
  };

  const removeCoaster = (id: number) => {
    setCoasters((prev) => prev.filter((coaster) => coaster.id !== id));
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      const updated = [...coasters];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setCoasters(updated);
    }
  };

  const moveDown = (index: number) => {
    if (index < coasters.length - 1) {
      const updated = [...coasters];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setCoasters(updated);
    }
  };

  const saveEdit = (id: number) => {
    setCoasters(prev =>
      prev.map(coaster =>
        coaster.id === id ? { ...coaster, ...editValues } : coaster
      )
    );
    setEditId(null);
    setEditValues({});
  };

  // Check coasters data
  console.log(coasters);  // Debugging log

  return (
    <div style={{ padding: '20px', fontFamily: "'Bebas Neue', sans-serif" }}>
      <h1 style={{ color: 'black', fontSize: '3rem' }}>Top 10</h1>

      <div>
        <AnimatePresence>
          {coasters.map((coaster, index) => {
            const isExpanded = expandedId === coaster.id;
            const isEditing = editId === coaster.id;

            return (
              <motion.div
                key={coaster.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: 'white',
                  marginBottom: '12px',
                  padding: '10px 20px',
                  backgroundColor: '#111',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : coaster.id)}
                >
                  <div style={{ fontSize: '1.5rem' }}>
                    {/* Ensure first coaster is correctly linked */}
                    {index + 1 === 1 ? (
                      <Link
                        to={`/home`} // This links to the Home page
                        style={{ color: 'lightblue', textDecoration: 'underline' }}
                      >
                        {coaster.name}
                      </Link>
                    ) : (
                      `${index + 1}: ${coaster.name}`
                    )}
                  </div>
                  <div>
                    <button onClick={(e) => { e.stopPropagation(); moveUp(index); }} style={buttonStyle}>↑</button>
                    <button onClick={(e) => { e.stopPropagation(); moveDown(index); }} style={buttonStyle}>↓</button>
                    <button onClick={(e) => { e.stopPropagation(); setEditId(coaster.id); setEditValues(coaster); }} style={buttonStyle}>✎</button>
                    <button onClick={(e) => { e.stopPropagation(); removeCoaster(coaster.id); }} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>✖</button>
                  </div>
                </div>

                {isExpanded && !isEditing && (
                  <div style={{ marginTop: '8px', fontSize: '1rem' }}>
                    🎢 <strong>Park:</strong> {coaster.park}<br />
                    🛠️ <strong>Manufacturer:</strong> {coaster.manufacturer}<br />
                    🧱 <strong>Type:</strong> {coaster.type}
                  </div>
                )}

                {isEditing && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input type="text" value={editValues.name || ''} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} style={inputStyle} />
                    <input type="text" value={editValues.manufacturer || ''} onChange={(e) => setEditValues({ ...editValues, manufacturer: e.target.value })} style={inputStyle} />
                    <select value={editValues.type || ''} onChange={(e) => setEditValues({ ...editValues, type: e.target.value as 'Steel' | 'Wood' })} style={inputStyle}>
                      <option value="">Type</option>
                      <option value="Steel">Steel</option>
                      <option value="Wood">Wood</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Powered">Powered</option>
                    </select>
                    <input type="text" value={editValues.park || ''} onChange={(e) => setEditValues({ ...editValues, park: e.target.value })} style={inputStyle} />
                    <button onClick={() => saveEdit(coaster.id)} style={{ ...buttonStyle, backgroundColor: 'darkgreen', width: 'fit-content' }}>💾 Save</button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {coasters.length < 10 && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: 'darkgreen', fontSize: '2rem' }}>Add a Coaster</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
            <input type="text" placeholder="Name" value={newCoaster.name || ''} onChange={(e) => setNewCoaster({ ...newCoaster, name: e.target.value })} style={inputStyle} />
            <input type="text" placeholder="Manufacturer" value={newCoaster.manufacturer || ''} onChange={(e) => setNewCoaster({ ...newCoaster, manufacturer: e.target.value })} style={inputStyle} />
            <select value={newCoaster.type || ''} onChange={(e) => setNewCoaster({ ...newCoaster, type: e.target.value as 'Steel' | 'Wood' })} style={inputStyle}>
              <option value="">Type</option>
              <option value="Steel">Steel</option>
              <option value="Wood">Wood</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Powered">Powered</option>
            </select>
            <input type="text" placeholder="Park" value={newCoaster.park || ''} onChange={(e) => setNewCoaster({ ...newCoaster, park: e.target.value })} style={inputStyle} />
            <button onClick={addCoaster} style={{ ...buttonStyle, width: 'fit-content', marginTop: '10px' }}>Add Coaster</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateCoastersPage;
