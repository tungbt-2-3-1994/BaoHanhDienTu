import { StackNavigator } from 'react-navigation';

import Products from '../screens/authorized/products/Products';
import Categories from '../screens/authorized/products/Categories';
import Detail from '../screens/authorized/products/Detail';
import AllProducts from '../screens/authorized/products/AllProducts';

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
    AllProducts: {
        screen: AllProducts
    }
}, {
        navigationOptions: {
            header: null
        },
    });

export default ProductsStack;