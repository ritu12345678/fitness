import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectLoadingText, selectLoadingType } from '../store/slices/loaderSlice';
import Loader, { PageLoader, InlineLoader, FullScreenLoader } from './Loader';

function GlobalLoader() {
  const isLoading = useSelector(selectIsLoading);
  const loadingText = useSelector(selectLoadingText);
  const loadingType = useSelector(selectLoadingType);

  if (!isLoading) return null;

  // Render different loader types based on Redux state
  switch (loadingType) {
    case 'fullscreen':
      return <FullScreenLoader text={loadingText} />;
    case 'inline':
      return <InlineLoader text={loadingText} />;
    case 'page':
    default:
      return <PageLoader text={loadingText} />;
  }
}

export default GlobalLoader;




