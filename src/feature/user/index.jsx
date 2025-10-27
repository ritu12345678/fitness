import React, { useEffect, useState, useCallback, useRef } from "react";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByRole } from "../../store/slices/roleSlice";
import { showLoader, hideLoader } from "../../store/slices/loaderSlice";
import { useToast } from "../../hooks/useToast";
import { getUserRoleId } from "../../utils/roleHelpers";

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function User() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const { users, loading, error, roles, rolesLoaded } = useSelector((state) => state.role);
  const { showError } = useToast();
console.log(roles)
  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      const userRoleId = getUserRoleId(roles);
      if (userRoleId) {
        dispatch(fetchUsersByRole({ roleId: userRoleId, params }));
      }
    }, 400)
  ).current;

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
  }, [debouncedFetch]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  // Refresh immediately (used after add/edit)
  const refreshUsers = useCallback(() => {
    const userRoleId = getUserRoleId(roles);
    if (userRoleId) {
      dispatch(fetchUsersByRole({ roleId: userRoleId }));
    }
  }, [dispatch, roles]);

  // Open modal for edit
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Fetch users when roles are loaded
  useEffect(() => {
    if (rolesLoaded && roles.length > 0) {
      const userRoleId = getUserRoleId(roles);
      if (userRoleId) {
        dispatch(fetchUsersByRole({ roleId: userRoleId }));
      }
    }
  }, [rolesLoaded, roles, dispatch]);

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
