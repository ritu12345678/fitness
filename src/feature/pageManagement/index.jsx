import React from 'react';
import PageList from './components/PageList';
import PageFilter from './components/PageFilter';
import PageModal from './components/PageModal';
import { apiService } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useToast } from '../../hooks/useToast';

function PagesFeature() {
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const [pages, setPages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [editingPage, setEditingPage] = React.useState(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const hasLoadedRef = React.useRef(false);

  // Debounced fetch to avoid back-to-back calls
  const debouncedFetchPagesRef = React.useRef(
    debounce(async () => {
      try {
        setLoading(true);
        setError(null);
        dispatch(showLoader({ text: 'Loading pages...', type: 'page' }));
        const response = await apiService.get('admin/pagemanagements');
        const data = response?.pages || response?.data || response || [];
        setPages(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load pages');
        showError('Failed to load pages. Please try again.');
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    }, 300)
  );

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError(null);
      dispatch(showLoader({ text: 'Loading pages...', type: 'page' }));
      const response = await apiService.get('admin/pagemanagements');
      console.log("responseee",response)
      const data = response?.pages || response?.data || response || [];
      setPages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load pages');
      showError('Failed to load pages. Please try again.');
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  React.useEffect(() => {
    if (hasLoadedRef.current) return; // prevent infinite calls
    hasLoadedRef.current = true;
    debouncedFetchPagesRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log("pages",pages)
  const handlePageCreated = async () => {
    await fetchPages();
    showSuccess('Page created successfully');
  };

  const handleEditPage = (page) => {
    console.log('Edit page:', page);
    setEditingPage(page);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditingPage(null);
  };

  const handlePageUpdated = async () => {
    await fetchPages();
    setOpenEditModal(false);
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters disabled for now per request - only add button */}
      <PageFilter onPageCreated={handlePageCreated} disableFilters={true} />
      <PageList 
        items={pages} 
        loading={loading} 
        error={error} 
        onEdit={handleEditPage}
      />
      
      {/* Edit Page Modal */}
      <PageModal
        open={openEditModal}
        onClose={handleEditModalClose}
        onSave={handlePageUpdated}
        page={editingPage}
      />
    </div>
  );
}

// Simple debounce function (same pattern as user)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default PagesFeature;


