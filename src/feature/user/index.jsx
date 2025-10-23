import React, { useEffect, useState, useCallback, useRef } from "react";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import { apiService } from "../../services/apiClient";
import { useToast } from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../store/slices/loaderSlice";

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const { showError } = useToast();

  // Fetch users from API
  const fetchUsers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      dispatch(showLoader({ text: "Loading users...", type: "page" }));
      const res = await apiService.get("users/all", params);
      const data = res?.users || res?.data?.users || res?.data || res || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      showError("Failed to load users.");
      setError(err.message);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  }, [dispatch, showError]);

  // Debounced fetch to avoid multiple API calls
  const debouncedFetch = useRef(debounce(fetchUsers, 400)).current;

  // Handle filter changes (search, status, etc.)
  const handleFilterChange = useCallback((filters) => {
    // Convert filters to API parameters
    const params = {};
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (filters.date && filters.date !== 'any') {
      params.date = filters.date;
    }

    // Use debounced API call
    debouncedFetch(params);
  }, []); // Empty dependency array - function never changes
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };
  // Refresh immediately (used after add/edit)
  const refreshUsers = useCallback(() => fetchUsers(), [fetchUsers]);

  // Open modal for edit
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <UserFilters onFilterChange={handleFilterChange} refreshUsers={refreshUsers} />
      <UserTable users={users} loading={loading} error={error} onEdit={handleEditUser} />
      <AddUserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={refreshUsers}
        user={selectedUser}
        isEdit={!!selectedUser}
      />
    </div>
  );
}

export default User;
