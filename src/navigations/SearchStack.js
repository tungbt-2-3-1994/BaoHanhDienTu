import { StackNavigator } from 'react-navigation';

import SearchView from '../screens/authorized/search/SearchView';
import ViewAll from '../screens/authorized/search/ViewAll';
import DetailBrand from '../screens/authorized/search/DetailBrand';

const SearchStack = StackNavigator({
    SearchView: {
        screen: SearchView
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