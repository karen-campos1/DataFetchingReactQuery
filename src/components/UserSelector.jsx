import React from 'react';

const UserSelector = ({ users, onUserSelect }) => {
  const handleUserSelect = React.useCallback((event) => {
    const userId = parseInt(event.target.value, 10);
    onUserSelect(userId);
  }, [onUserSelect]);

  return (
    <div id="box">
    <select onChange={handleUserSelect}>
      <option value="">All Users</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
    </div>
  );
};

export default UserSelector;
