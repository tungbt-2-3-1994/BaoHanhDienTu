import { StackNavigator } from 'react-navigation';

import Search from '../screens/authorized/search/Search';
import ViewAll from '../screens/authorized/search/ViewAll';
import DetailBrand from '../screens/authorized/search/DetailBrand';

const SearchStack = StackNavigator({
    Search: {
        screen: Search
    },
    ViewAll: {
        screen: ViewAll
    },
    DetailBrand: {
        screen: DetailBrand
    },
}, {
        navigationOptions: {
            header: null
        },

    });

export default SearchStack;