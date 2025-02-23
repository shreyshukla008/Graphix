import React, { useEffect, useRef } from 'react';

const Log = ({ logs, isAnimationStarted, isPaused, resetState, togglePause, startAnimation }) => {
    const logContainerRef = useRef();
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const getLogStyle = (type) => {
        switch (type) {
            case 'success':
                return 'text-lime-500 font-bold'; // Green for success
            case 'error':
                return 'text-red-500 font-bold'; // Red for errors
            case 'info':
                return 'text-yellow-400 font-bold'; // Yellow for analyzing
            default:
                return 'text-white'; // Default white text
        }
    };

    return (
        <div className="vt323-regular h-[250px] overflow-hidden bg-slate-950 p-2 mt-4 rounded-lg border-2 border-dashed border-lime-500 shadow-md" >
            <div className=" flex justify-between p-2 sticky top-0 bg-slate-950 border-b-2 border-dashed border-lime-500 pb-2 mb-3 text-lime-500 text-lg font-semibold z-10">
                <div className='silkscreen-regular text-xl'>C O N S O L E</div>

                {

!isAnimationStarted ?
(<button><i className='icon-power border-2 p-1 rounded-full text-lg border-lime-400 bg-gray-700 ' onClick={startAnimation}></i></button>):
(   
  <div className='flex justify-evenly gap-4'>
      {
        isPaused ?
        (<button><i className='icon-control-play border-2 p-1 rounded-full text-lg border-lime-400 bg-gray-700 ' onClick={togglePause}></i></button>):
        (<button><i className='icon-control-pause text-yellow-400 border-2 p-1 rounded-full text-lg border-yellow-400 bg-gray-700 ' onClick={togglePause}></i></button>)
      }
        <button><i className='icon-refresh text-red-400 border-2 p-1 rounded-full text-lg border-red-400 bg-gray-700 ' onClick={resetState}></i></button>
  </div>
)
}
                
            </div>
            <ul
                ref={logContainerRef}
                className="py-3 h-32  overflow-y-auto"
                style={{ height: 'calc(100% - 40px)', scrollbarColor:'black #4caf50', scrollbarWidth:'thin'}} // Adjust height for logs excluding heading
            >
                {logs.map((log, index) => (
                    <li key={index} className={`${getLogStyle(log.type)}  flex justify-start gap-2`}>
                        <span>
                            {log.type === 'info' && '>>> '}
                            {log.type === 'success' && '✔✔✔ '}
                            {log.type === 'error' && '!!! '}
                        </span>
                        {log.message}
                        <span>{' ...'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Log;
