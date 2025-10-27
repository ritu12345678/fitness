import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainerFilter from './components/TrainerFilter';
import TrainerTable from './components/TrainerTable';
import AddTrainerModal from './components/AddTrainerModal';
import { fetchUsersByRole } from '../../store/slices/roleSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useToast } from '../../hooks/useToast';
import { getTrainerRoleId } from '../../utils/roleHelpers';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function Trainer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const dispatch = useDispatch();
  const { trainers, loading, error, roles, rolesLoaded } = useSelector((state) => state.role);
  const { showError } = useToast();

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      const trainerRoleId = getTrainerRoleId(roles);
      if (trainerRoleId) {
        dispatch(fetchUsersByRole({ roleId: trainerRoleId, params }));
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

  const handleAddTrainer = () => {
    setSelectedTrainer(null);
    setModalOpen(true);
  };

  // Refresh immediately (used after add/edit)
  const refreshTrainers = useCallback(() => {
    const trainerRoleId = getTrainerRoleId(roles);
    if (trainerRoleId) {
      dispatch(fetchUsersByRole({ roleId: trainerRoleId }));
    }
  }, [dispatch, roles]);

  // Open modal for edit
  const handleEditTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setModalOpen(true);
  };

  // Fetch trainers when roles are loaded
  useEffect(() => {
    if (rolesLoaded && roles.length > 0) {
      const trainerRoleId = getTrainerRoleId(roles);
      if (trainerRoleId) {
        dispatch(fetchUsersByRole({ roleId: trainerRoleId }));
      }
    }
  }, [rolesLoaded, roles, dispatch]);

  return (
    <div className="space-y-4">
      <TrainerFilter onFilterChange={handleFilterChange} refreshTrainers={refreshTrainers} />
      <TrainerTable trainers={trainers} loading={loading} error={error} onEdit={handleEditTrainer} />
      <AddTrainerModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTrainer(null);
        }}
        onSave={refreshTrainers}
        trainer={selectedTrainer}
        isEdit={!!selectedTrainer}
      />
    </div>
  );
}
export default Trainer;

