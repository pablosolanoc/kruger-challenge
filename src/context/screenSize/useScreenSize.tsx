

import React, { createContext, useContext, useMemo } from "react";
import useMedia  from "use-media";
import {allBreakPoints} from "constants/screenSize/screenSizeBreakpoints";
import {BreakPointNames} from "types/screenSize"

interface ScreenSizeProviderProps {
  children: React.ReactNode;
}

export interface ScreenSizeContextProps {
  isMobileView: boolean;
  isTabletView: boolean;
  isLaptopView: boolean;
  isDesktopView: boolean;
  isLargeDesktopView: boolean;
};

export const ScreenSizeContext= createContext({} as ScreenSizeContextProps );

export const screenSizeQueries = {
  greater : (breakpoint: BreakPointNames) => {
    return `(min-width: ${allBreakPoints[breakpoint]}px)`
  },
  lesser : (breakpoint: BreakPointNames) => {
    return `(max-width: ${allBreakPoints[breakpoint] - 1}px)`
  },
  between : (minScreenSize : BreakPointNames, maxScreenSize : BreakPointNames) => {
    return `${screenSizeQueries.greater(minScreenSize)} and ${screenSizeQueries.lesser(maxScreenSize)}`
  }
}

function ScreenSizeProvider({children} : ScreenSizeProviderProps) {

  const isMobileView = useMedia(screenSizeQueries.lesser("sm"));
  const isTabletView = useMedia(screenSizeQueries.between("sm", "md"));
  const isLaptopView = useMedia(screenSizeQueries.between("md", "lg"));
  const isDesktopView = useMedia(screenSizeQueries.between("lg", "xl"));
  const isLargeDesktopView = useMedia(screenSizeQueries.greater("xl"));

  const value = useMemo( () => ({
    isMobileView,
    isTabletView,
    isLaptopView,
    isDesktopView,
    isLargeDesktopView,
  }), [
    isMobileView,
    isTabletView,
    isLaptopView,
    isDesktopView,
    isLargeDesktopView
  ]);


  return(
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  )

}

export const useScreenSize =  () => useContext(ScreenSizeContext);

export default ScreenSizeProvider;