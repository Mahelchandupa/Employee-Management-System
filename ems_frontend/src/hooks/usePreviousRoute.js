import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function usePreviousRoute() {
    const location = useLocation();
    const previousLocation = useRef(location);

    useEffect(() => {
        previousLocation.current = location;
    }, [location]);

    return previousLocation.current;
}

export default usePreviousRoute;