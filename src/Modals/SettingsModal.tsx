import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

interface SettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ show, onHide }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [goal, setGoal] = useState<number>(100);
  const [theme, setTheme] = useState('classic');
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode') === 'enabled';
    const storedName = localStorage.getItem('displayName') || '';
    const storedGoal = parseInt(localStorage.getItem('goal') || '100', 10);
    const storedTheme = localStorage.getItem('theme') || 'classic';
    const storedMusic = localStorage.getItem('music') === 'enabled';

    setDarkMode(storedDark);
    setDisplayName(storedName);
    setGoal(storedGoal);
    setTheme(storedTheme);
    setMusicEnabled(storedMusic);
  }, []);

  const handleSave = () => {
    localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('goal', goal.toString());
    localStorage.setItem('theme', theme);
    localStorage.setItem('music', musicEnabled ? 'enabled' : 'disabled');
    onHide();
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all your data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDarkMode">
            <Form.Check
              type="switch"
              label="Dark Mode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Form.Group>

          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGoal">
            <Form.Label>Cred Goal</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="formTheme">
            <Form.Label>Theme</Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="themes"
              value={theme}
              onChange={(val) => setTheme(val)}
              className="mb-3"
            >
              <ToggleButton id="tbg-radio-1" value={'classic'} variant="outline-primary">Classic</ToggleButton>
              <ToggleButton id="tbg-radio-2" value={'retro'} variant="outline-success">Vintage</ToggleButton>
              <ToggleButton id="tbg-radio-3" value={'night'} variant="outline-dark">Night Rider</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleResetData}>Reset All Data</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
