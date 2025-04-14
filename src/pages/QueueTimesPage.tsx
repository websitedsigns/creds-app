import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Park {
  id: number;
  name: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

interface ParkGroup {
  id: number;
  name: string;
  parks: Park[];
}

interface Ride {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
}

interface Land {
  id: number;
  name: string;
  rides: Ride[];
}

interface QueueTimes {
  lands: Land[];
  rides: Ride[];
}

const QueueTimesPage: React.FC = () => {
  const [parkGroups, setParkGroups] = useState<ParkGroup[]>([]);
  const [selectedParkId, setSelectedParkId] = useState<number | null>(null);
  const [queueTimes, setQueueTimes] = useState<QueueTimes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get('https://queue-times.com/parks.json');
        console.log('Parks data:', response.data);  // Log the response data
        setParkGroups(response.data);
        setLoading(false);
      } catch {
        setError('Error fetching parks');
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    if (selectedParkId !== null) {
      const fetchQueueTimes = async () => {
        try {
          const response = await axios.get(`https://queue-times.com/parks/${selectedParkId}/queue_times.json`);
          console.log('Queue times data:', response.data);  // Log the response data
          setQueueTimes(response.data);
        } catch {
          setError('Error fetching queue times');
        }
      };

      fetchQueueTimes();
    }
  }, [selectedParkId]);

  return (
    <div>
      <h1>Theme Park Queue Times</h1>
      {loading ? (
        <p>Loading parks...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Use the error state to display error messages
      ) : (
        <>
          <h2>Select a Park</h2>
          <select onChange={(e) => setSelectedParkId(Number(e.target.value))} value={selectedParkId || ''}>
            <option value="" disabled>Select a park</option>
            {parkGroups.map((group) => (
              <optgroup key={group.id} label={group.name}>
                {group.parks.map((park) => (
                  <option key={park.id} value={park.id}>
                    {park.name} ({park.country})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </>
      )}

      {queueTimes && (
        <div>
          <h2>Queue Times</h2>
          {queueTimes.lands.map((land) => (
            <div key={land.id}>
              <h3>{land.name}</h3>
              <ul>
                {land.rides.map((ride) => (
                  <li key={ride.id}>
                    {ride.name} - {ride.is_open ? `${ride.wait_time} min wait` : 'Closed'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueTimesPage;
