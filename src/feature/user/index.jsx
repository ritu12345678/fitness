import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const { users, loading, error, roles, rolesLoaded, pagination } = useSelector((state) => state.role);
  const { showError } = useToast();

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      console.log('🚀 debouncedFetch called with params:', params);
      const userRoleId = getUserRoleId(roles);
      if (userRoleId) {
        console.log('📤 Dispatching to Redux with params:', params);
        dispatch(fetchUsersByRole({ roleId: userRoleId, params }));
      }
    }, 400)
  ).current;

  // Handle pagination changes
  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage + 1); // MUI uses 0-based, API uses 1-based
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
  }, []);

  // Handle filter changes (search, status, etc.)
  const handleFilterChange = useCallback((filters) => {
    console.log('🔍 handleFilterChange received filters:', filters);
    
    // Convert filters to API parameters
    const params = {
      page: 1, // Reset to first page when filters change
      limit: rowsPerPage,
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    // Handle date range - only add if both dates exist
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }
    
    console.log('📤 Calling debouncedFetch with params:', params);
    
    // Use debounced API call
    debouncedFetch(params);
    setPage(1); // Reset to first page
  }, [debouncedFetch, rowsPerPage]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  // Refresh immediately (used after add/edit)
  const refreshUsers = useCallback(() => {
    const userRoleId = getUserRoleId(roles);
    if (userRoleId) {
      const params = {
        page: page,
        limit: rowsPerPage,
      };
      dispatch(fetchUsersByRole({ roleId: userRoleId, params }));
    }
  }, [dispatch, roles, page, rowsPerPage]);

  // Open modal for edit
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Build params from URL search params
  const buildParamsFromUrl = useCallback(() => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    const search = searchParams.get('query') || searchParams.get('search');
    const status = searchParams.get('status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (search) params.search = search;
    if (status && status !== 'all') params.status = status;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }, [searchParams, page, rowsPerPage]);

  // Fetch users when roles are loaded, page changes, or rowsPerPage changes
  useEffect(() => {
    if (rolesLoaded && roles.length > 0) {
      const userRoleId = getUserRoleId(roles);
      if (userRoleId) {
        const params = buildParamsFromUrl();
        console.log('🔄 Fetch with params:', params);
        dispatch(fetchUsersByRole({ roleId: userRoleId, params }));
      }
    }
  }, [rolesLoaded, roles, dispatch, buildParamsFromUrl, page, rowsPerPage]);

  return (
    <div className="space-y-4">
      <UserFilters onFilterChange={handleFilterChange} refreshUsers={refreshUsers} />
      <UserTable 
        users={users} 
        loading={loading} 
        error={error} 
        onEdit={handleEditUser}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
      />
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
