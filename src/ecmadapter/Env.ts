const Env = {
    target: process.env.NODE_ENV === 'development' ? 'development' : (process.env.REACT_APP_ENV_TARGET || 'development'), // development, nexts : NEXTS
    devBaseData: process.env.REACT_APP_DEV_BASE_DATA ? JSON.parse(process.env.REACT_APP_DEV_BASE_DATA) : undefined
};
export default Env;