import React, { useState, useEffect } from 'react';
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('top10coasters');
    if (stored) {
      setCoasters(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (coasters.length) {
      localStorage.setItem('top10coasters', JSON.stringify(coasters));
    }
  }, [coasters]);

  const addCoaster = () => {
    if (newCoaster.name && newCoaster.manufacturer && newCoaster.type && newCoaster.park) {
      setCoasters(prev => [...prev, { ...newCoaster, id: Date.now() } as Coaster]);
      setNewCoaster({});
      setModalOpen(false);
    }
  };

  const removeCoaster = (id: number) => {
    setCoasters(prev => prev.filter(coaster => coaster.id !== id));
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
    setCoasters(prev => prev.map(coaster => coaster.id === id ? { ...coaster, ...editValues } : coaster));
    setEditId(null);
    setEditValues({});
  };

  const topCoaster = coasters[0];
  const remainingCoasters = coasters.slice(1);

  return (
    <div style={{ padding: '20px', fontFamily: "'Bebas Neue', sans-serif" }}>
      <h1 style={{ color: 'black', fontSize: '3rem' }}>Top 10</h1>

      {/* Top Coaster */}
      {topCoaster && (
        <motion.div
          key={topCoaster.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            color: 'white',
            marginBottom: '12px',
            padding: '10px 20px',
            backgroundColor: '#111',
            border: '3px solid gold',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => setExpandedId(expandedId === topCoaster.id ? null : topCoaster.id)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: 'gold' }}>
              1: {topCoaster.name}
            </div>
            <div>
              <button onClick={(e) => { e.stopPropagation(); moveDown(0); }} style={buttonStyle}>↓</button>
              <button onClick={(e) => { e.stopPropagation(); setEditId(topCoaster.id); setEditValues(topCoaster); }} style={buttonStyle}>✎</button>
              <button onClick={(e) => { e.stopPropagation(); removeCoaster(topCoaster.id); }} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>✖</button>
            </div>
          </div>

          {expandedId === topCoaster.id && editId !== topCoaster.id && (
            <div style={{ marginTop: '8px', fontSize: '1rem' }}>
              🎢 <strong>Park:</strong> {topCoaster.park}<br />
              🛠️ <strong>Manufacturer:</strong> {topCoaster.manufacturer}<br />
              🧱 <strong>Type:</strong> {topCoaster.type}
            </div>
          )}

          {editId === topCoaster.id && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input type="text" value={editValues.name || ''} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} style={inputStyle} />
              <input type="text" value={editValues.manufacturer || ''} onChange={(e) => setEditValues({ ...editValues, manufacturer: e.target.value })} style={inputStyle} />
              <select value={editValues.type || ''} onChange={(e) => setEditValues({ ...editValues, type: e.target.value as Coaster['type'] })} style={inputStyle}>
                <option value="">Type</option>
                <option value="Steel">Steel</option>
                <option value="Wood">Wood</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Powered">Powered</option>
              </select>
              <input type="text" value={editValues.park || ''} onChange={(e) => setEditValues({ ...editValues, park: e.target.value })} style={inputStyle} />
              <button onClick={() => saveEdit(topCoaster.id)} style={{ ...buttonStyle, backgroundColor: 'darkgreen' }}>💾 Save</button>
            </div>
          )}
        </motion.div>
      )}

      {/* Remaining Coasters */}
      <AnimatePresence>
        {remainingCoasters.map((coaster, index) => {
          const isExpanded = expandedId === coaster.id;
          const isEditing = editId === coaster.id;
          const position = index + 2;

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
                cursor: 'pointer',
              }}
              onClick={() => setExpandedId(isExpanded ? null : coaster.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem' }}>{position}: {coaster.name}</div>
                <div>
                  <button onClick={(e) => { e.stopPropagation(); moveUp(position - 1); }} style={buttonStyle}>↑</button>
                  <button onClick={(e) => { e.stopPropagation(); moveDown(position - 1); }} style={buttonStyle}>↓</button>
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
                  <select value={editValues.type || ''} onChange={(e) => setEditValues({ ...editValues, type: e.target.value as Coaster['type'] })} style={inputStyle}>
                    <option value="">Type</option>
                    <option value="Steel">Steel</option>
                    <option value="Wood">Wood</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Powered">Powered</option>
                  </select>
                  <input type="text" value={editValues.park || ''} onChange={(e) => setEditValues({ ...editValues, park: e.target.value })} style={inputStyle} />
                  <button onClick={() => saveEdit(coaster.id)} style={{ ...buttonStyle, backgroundColor: 'darkgreen' }}>💾 Save</button>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Modal */}
      {modalOpen && (
        <div className="modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', width: '80%', maxWidth: '500px' }}>
            <h2>Add a Coaster</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Name"
                value={newCoaster.name || ''}
                onChange={(e) => setNewCoaster({ ...newCoaster, name: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Manufacturer"
                value={newCoaster.manufacturer || ''}
                onChange={(e) => setNewCoaster({ ...newCoaster, manufacturer: e.target.value })}
                style={inputStyle}
              />
              <select
                value={newCoaster.type || ''}
                onChange={(e) => setNewCoaster({ ...newCoaster, type: e.target.value as Coaster['type'] })}
                style={inputStyle}
              >
                <option value="">Type</option>
                <option value="Steel">Steel</option>
                <option value="Wood">Wood</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Powered">Powered</option>
              </select>
              <input
                type="text"
                placeholder="Park"
                value={newCoaster.park || ''}
                onChange={(e) => setNewCoaster({ ...newCoaster, park: e.target.value })}
                style={inputStyle}
              />
              <div>
                <button onClick={addCoaster} style={{ ...buttonStyle, backgroundColor: 'darkgreen' }}>Add Coaster</button>
                <button onClick={() => setModalOpen(false)} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateCoastersPage;
