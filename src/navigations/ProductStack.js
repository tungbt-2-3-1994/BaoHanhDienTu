import { StackNavigator } from 'react-navigation';

import Products from '../screens/authorized/products/Products';
import Categories from '../screens/authorized/products/Categories';
import Detail from '../screens/authorized/products/Detail';
// import Map from '../screens/authorized/products/Map';

const ProductsStack = StackNavigator({
    Categories: {
        screen: Categories
    },
    Products: {
        screen: Products
    },
    Detail: {
        screen: Detail
    },
    // Map: {
    //     screen: Map
    // }
}, {
        navigationOptions: {
            header: null
        },
    });

export default ProductsStack;