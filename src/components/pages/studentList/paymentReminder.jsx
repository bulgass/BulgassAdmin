import React, { useState, useEffect } from 'react';
import { getToken } from './firebase';

const NotificationComponent = () => {
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    getToken(setTokenFound);
  }, []);

  return (
    <div>
      {isTokenFound ? (
        <h1>FCM Token received. Notifications are enabled.</h1>
      ) : (
        <h1>FCM Token not received. Notifications are not enabled.</h1>
      )}
    </div>
  );
};

export default NotificationComponent;
