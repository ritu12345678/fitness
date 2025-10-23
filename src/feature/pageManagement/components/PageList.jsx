import React from 'react';
import Switch from '@mui/material/Switch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';

// Sample content for display (replace with actual content from API)
const SAMPLE_CONTENT = 'This is a sample page content. In a real application, this would be the actual content from the API response.';

// Individual page row component
function PageRow({ page, onDelete, onEdit }) {
  const { showSuccess, showError } = useToast();
  const [isActive, setIsActive] = React.useState(page.status || page.active || true);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [isToggling, setIsToggling] = React.useState(false);

  const handleDelete = () => {
    onDelete(page.title);
    setShowDeleteModal(false);
  };

  const handleToggleActive = async (event) => {
    const newStatus = event.target.checked;
    setIsToggling(true);
    
    try {
      console.log('🔄 Toggling page status:', { page_id: page.id || page.page_id, status: newStatus });
      
      // Call API to update page status
      await apiService.put('admin/pagemanagements', {
        page_id: page.id || page.page_id,
        status: newStatus
      });
      
      // Update local state
      setIsActive(newStatus);
      showSuccess(`Page ${newStatus ? 'activated' : 'deactivated'} successfully!`);
      
    } catch (error) {
      console.error('❌ Page toggle error:', error);
      showError('Failed to update page status. Please try again.');
      // Revert the switch state
      setIsActive(!newStatus);
    } finally {
      setIsToggling(false);
    }
  };

  const handleEdit = () => {
    console.log('Edit page:', page);
    onEdit?.(page);
  };

  return (
    <>
      <div className="py-4">
        {/* Page Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-lg">{page.title}</h4>
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {page.updatedAt || 'Unknown'}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Active Toggle */}
            <div className="flex items-center gap-2">
              <Switch 
                size="small" 
                checked={isActive} 
                onChange={handleToggleActive}
                disabled={isToggling}
              />
              <span className="text-xs text-gray-600">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Edit Button */}
            <button 
              onClick={handleEdit}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <BorderColorIcon sx={{ fontSize: 16 }} />
              Edit
            </button>

            {/* Delete Button */}
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
              Delete
            </button>
          </div>
        </div>

        {/* Page Content Preview */}
        <div className="mt-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {page.content || SAMPLE_CONTENT}
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        customContent={
          <div className="text-center py-4">
            <div className="text-lg font-medium text-red-600 mb-2">
              Delete "{page.title}"?
            </div>
            <div className="text-sm text-gray-600">
              This action cannot be undone. All content and settings for this page will be permanently removed.
            </div>
          </div>
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="#C82D30"
        showDeleteIcon={true}
        showCloseButton={false}
      />
    </>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
            <div className="h-16 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Error state component
function ErrorState({ error }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="text-center">
        <div className="text-red-600 text-lg font-medium mb-2">
          Failed to load pages
        </div>
        <div className="text-sm text-gray-600">
          {error || 'Something went wrong. Please try again.'}
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <div className="text-center">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No pages found
        </div>
        <div className="text-sm text-gray-400">
          Create your first page using the "Add Page" button above.
        </div>
      </div>
    </div>
  );
}

// Main PageList component
function PageList({ items = [], loading = false, error = null, onEdit }) {
  const [pages, setPages] = React.useState(items);

  // Update local state when items prop changes
  React.useEffect(() => {
    setPages(items);
  }, [items]);

  // Handle page deletion
  const handleDeletePage = (pageTitle) => {
    console.log(`Deleting page: ${pageTitle}`);
    // TODO: Add API call to delete page
    setPages(prev => prev.filter(page => page.title !== pageTitle));
  };

  // Show loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Show empty state
  if (!pages || pages.length === 0) {
    return <EmptyState />;
  }

  // Show pages list
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Pages ({pages.length})
          </h3>
        </div>
        
        <div className="space-y-0">
          {pages.map((page, index) => (
            <div key={page.id || page.title}>
              <PageRow 
                page={page} 
                onDelete={handleDeletePage}
                onEdit={onEdit}
              />
              {index < pages.length - 1 && (
                <div className="border-t border-gray-200 my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageList;