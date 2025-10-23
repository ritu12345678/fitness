import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchUsers, 
  createUser, 
  deleteUser, 
  clearError 
} from '../store/slices/userSlice';

function UserExample() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleCreateUser = async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    };
    
    try {
      await dispatch(createUser(newUser)).unwrap();
      console.log('User created successfully');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={handleClearError}>Clear Error</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button 
              onClick={() => handleDeleteUser(user.id)}
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserExample;
