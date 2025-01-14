import React from 'react';

const Username = ({ username, setUsername }) => {
  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
  );
};

export default Username;