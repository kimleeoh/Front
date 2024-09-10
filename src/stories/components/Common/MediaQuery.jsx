import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useDeviceDetect = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

  return { isAndroid, isIOS };
};

export const useResponsiveSize = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 320 });
  const isMediumScreen = useMediaQuery({ minWidth: 321, maxWidth: 375 });
  const isLargeScreen = useMediaQuery({ minWidth: 376 });

  return { isSmallScreen, isMediumScreen, isLargeScreen };
};