import { StackNavigator } from 'react-navigation';

import Home from '../screens/authorized/home/Home';
import HomeNewsDetail from '../screens/authorized/home/HomeNewsDetail';
import DetailProduct from '../screens/authorized/home/DetailProduct';
import ViewMoreNews from '../screens/authorized/home/ViewMoreNews';

const HomeStack = StackNavigator({
    Home: {
        screen: Home
    },
    HomeNewsDetail: {
        screen: HomeNewsDetail
    },
    DetailProduct: {
        screen: DetailProduct
    },
    ViewMoreNews: {
        screen: ViewMoreNews
    },
}, {
        navigationOptions: {
            header: null
        },

    });

export default HomeStack;