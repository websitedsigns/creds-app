import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from 'react-icons/fa';

const AddCredsPage = () => {
  const [coasters, setCoasters] = useState<{ id: string; name: string; park: string; type: string; manufacturer: string }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCoaster, setNewCoaster] = useState({ name: '', park: '', type: 'steel', manufacturer: '' });
  const [expandedCoaster, setExpandedCoaster] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const storedCreds = localStorage.getItem('creds');
    if (storedCreds) {
      setCoasters(JSON.parse(storedCreds));
    }
  }, []);

  const handleAddCoaster = () => {
    const duplicate = coasters.find(
      (coaster) => coaster.name === newCoaster.name && coaster.park === newCoaster.park
    );

    if (duplicate) {
      setDuplicateWarning(true);
    } else {
      const updatedCoasters = [...coasters, { ...newCoaster, id: Date.now().toString() }];
      localStorage.setItem('creds', JSON.stringify(updatedCoasters));
      setCoasters(updatedCoasters);
      setNewCoaster({ name: '', park: '', type: 'steel', manufacturer: '' });
      setShowModal(false);
    }
  };

  const handleDeleteCoaster = (id: string) => {
    const updatedCoasters = coasters.filter((coaster) => coaster.id !== id);
    localStorage.setItem('creds', JSON.stringify(updatedCoasters));
    setCoasters(updatedCoasters);
  };

  const handleEditCoaster = (id: string) => {
    const coasterToEdit = coasters.find((coaster) => coaster.id === id);
    if (coasterToEdit) {
      setNewCoaster(coasterToEdit);
      setShowModal(true);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredCoasters = coasters.filter(
    (coaster) =>
      coaster.name.toLowerCase().includes(search.toLowerCase()) ||
      coaster.park.toLowerCase().includes(search.toLowerCase()) ||
      coaster.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpandedCoaster = (id: string) => {
    setExpandedCoaster(expandedCoaster === id ? null : id);
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Bebas Neue', sans-serif", color: 'white' }}>
      {/* Total Coasters Display */}
      <div style={{ marginBottom: '20px', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>Creds</h1>
          <span style={{ fontSize: '1.5rem' }}>Total Coasters: {coasters.length}</span>
        </div>
        {/* Search Icon (Magnifying Glass) */}
        <FaSearch 
          onClick={() => setShowSearchModal(true)} 
          style={{ 
            fontSize: '2rem', 
            cursor: 'pointer', 
            color: 'black', 
            zIndex: 10, // Ensure it is on top
            position: 'absolute',
            top: '80px',
            right: '20px' // Position it in the top-right corner
          }} 
        />
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search coasters..."
                style={inputStyle}
              />
              <FaTimes
                onClick={() => setShowSearchModal(false)}
                style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'white' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Coaster Button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowModal(true)} style={addButtonStyle}>
          Add Coaster
        </button>
      </div>

      {/* Coasters List Display */}
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {filteredCoasters.map((coaster) => (
          <div key={coaster.id} style={listItemStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.5rem' }}>
                  <strong>{coaster.name}</strong> - {coaster.park}
                </div>
              </div>
              <div>
                <button onClick={() => handleEditCoaster(coaster.id)} style={buttonStyle}>Edit</button>
                <button onClick={() => handleDeleteCoaster(coaster.id)} style={buttonStyle}>Delete</button>
              </div>
            </div>

            {expandedCoaster === coaster.id && (
              <div style={{ marginTop: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '8px' }}>
                <div><strong>Type:</strong> {coaster.type}</div>
                <div><strong>Manufacturer:</strong> {coaster.manufacturer}</div>
              </div>
            )}

            <div onClick={() => toggleExpandedCoaster(coaster.id)} style={expandButtonStyle}>
              {expandedCoaster === coaster.id ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Coaster */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Add Coaster</h2>

            {duplicateWarning && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                This coaster already exists! Do you still want to add it again?
              </div>
            )}

            <input
              type="text"
              value={newCoaster.name}
              onChange={(e) => setNewCoaster({ ...newCoaster, name: e.target.value })}
              placeholder="Coaster Name"
              style={inputStyle}
            />

            <input
              type="text"
              value={newCoaster.park}
              onChange={(e) => setNewCoaster({ ...newCoaster, park: e.target.value })}
              placeholder="Park Name"
              style={inputStyle}
            />

            <select
              value={newCoaster.type}
              onChange={(e) => setNewCoaster({ ...newCoaster, type: e.target.value })}
              style={inputStyle}
            >
              <option value="steel">Steel</option>
              <option value="wood">Wood</option>
              <option value="hybrid">Hybrid</option>
              <option value="powered">Powered</option>
              <option value="kiddie">Kiddie</option>
            </select>

            <input
              type="text"
              value={newCoaster.manufacturer}
              onChange={(e) => setNewCoaster({ ...newCoaster, manufacturer: e.target.value })}
              placeholder="Manufacturer"
              style={inputStyle}
            />

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleAddCoaster} style={submitButtonStyle}>Add Coaster</button>
              <button onClick={() => setShowModal(false)} style={cancelButtonStyle}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// === Style Objects ===
const listItemStyle: React.CSSProperties = {
  backgroundColor: '#111',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '8px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'darkgreen',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '5px',
};

const addButtonStyle: React.CSSProperties = {
  backgroundColor: '#444',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.2rem',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  color: 'white',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  width: '100%',
  marginBottom: '10px',
  backgroundColor: '#333',
  border: '1px solid #444',
  borderRadius: '5px',
  color: 'white',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: 'darkgreen',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#999',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const expandButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'white',
  padding: '5px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
};

export default AddCredsPage;
