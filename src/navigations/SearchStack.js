import { StackNavigator } from 'react-navigation';

import SearchView from '../screens/authorized/search/SearchView';
import DetailBrand from '../screens/authorized/search/DetailBrand';

const SearchStack = StackNavigator({
    SearchView: {
        screen: SearchView
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