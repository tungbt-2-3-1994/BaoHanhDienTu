import RootNav from '../navigations/RootNav';

const initialState = RootNav.router.getStateForAction(RootNav.router.getActionForPathAndParams('SplashScreen'));

export default (state = initialState, action) => {
    const nextState = RootNav.router.getStateForAction(action, state);
    return nextState || state;
};
