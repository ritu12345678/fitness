import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DetailFilters from './component/DetailFilter'
import DetailHeader from './component/DetailHeader'
import DetailTable from './component/DetailTable'
import { showLoader, hideLoader } from '../../../store/slices/loaderSlice'
import { apiService } from '../../../services/apiClient'
import { useToast } from '../../../hooks/useToast'
import { useUrlFilters } from '../../../hooks/useUrlFilters'

const BatchDetail = () => {
  const { batchId } = useParams()
  const dispatch = useDispatch()
  const { showError } = useToast()
  const [batch, setBatch] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const hasFetched = useRef(false)

  // Define default filters for URL
  const defaultFilters = {
    query: '',
    filter: 'all',
    date: 'any'
  }

  // Use URL filters hook
  const { filters } = useUrlFilters(defaultFilters)

  // Debounced fetch function
  const debouncedFetchBatchDetail = useRef(
    debounce(async (params) => {
      if (!batchId) return

      try {
        setLoading(true)
        dispatch(showLoader({
          text: 'Loading batch details...',
          type: 'page'
        }))

        console.log('Fetching batch detail for ID:', batchId, 'with filters:', params)
        
        // Call API with batch ID and filter parameters
        const response = await apiService.get(`admin/batches/${batchId}`, params)
        
        console.log('Batch detail API response:', response)
        
        // Set batch data
        setBatch(response)
        setError(null)

      } catch (err) {
        console.error('Error fetching batch detail:', err)
        console.error('Error details:', err.response?.data)
        setError(err.response?.data?.message || err.message || 'Failed to load batch details')
        showError('Failed to load batch details. Please try again.')
      } finally {
        setLoading(false)
        dispatch(hideLoader())
      }
    }, 500)
  ).current

  // Handle filter changes and trigger API call
  const handleFilterChange = useCallback(() => {
    const params = {}

    // Add filter parameters to API call
    if (filters.query) {
      params.search = filters.query
    }

    if (filters.filter && filters.filter !== 'all') {
      params.status = filters.filter
    }

    if (filters.date && filters.date !== 'any') {
      params.date = filters.date
    }

    console.log('Filter changed, calling API with params:', params)
    debouncedFetchBatchDetail(params)
  }, [filters, debouncedFetchBatchDetail])

  // Watch for filter changes and trigger API call
  useEffect(() => {
    handleFilterChange()
  }, [handleFilterChange])

  // Initial load - runs once on mount
  useEffect(() => {
    const loadBatchDetail = async () => {
      if (!batchId || hasFetched.current) return

      hasFetched.current = true

      try {
        dispatch(showLoader({
          text: 'Loading batch details...',
          type: 'page'
        }))

        console.log('Initial load - Fetching batch detail for ID:', batchId)
        
        // Initial API call without filters
        const response = await apiService.get(`admin/batches/${batchId}`)
        
        console.log('Initial batch detail API response:', response)
        
        setBatch(response)
        setError(null)

      } catch (err) {
        console.error('Error fetching batch detail:', err)
        console.error('Error details:', err.response?.data)
        setError(err.response?.data?.message || err.message || 'Failed to load batch details')
        showError('Failed to load batch details. Please try again.')
      } finally {
        dispatch(hideLoader())
      }
    }

    loadBatchDetail()
  }, [batchId])

  // Reset hasFetched when batchId changes
  useEffect(() => {
    hasFetched.current = false
  }, [batchId])

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 text-lg font-semibold">
          Error: {error}
        </div>
        <button
          onClick={() => debouncedFetchBatchDetail({})}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  // Always render the components, even if batch is null
  return (
    <div className='space-y-6'>
      <DetailFilters batch={batch} />
      <DetailHeader batch={batch} />
      <DetailTable batch={batch} />
    </div>
  )
}

// Simple debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default BatchDetail
