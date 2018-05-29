import { StackNavigator } from 'react-navigation';

import Account from '../screens/authorized/account/Account';
import Register from '../screens/authorized/account/Register';


const AccountStack = StackNavigator({
    Account: {
        screen: Account
    },
    Register: {
        screen: Register
    }
}, {
        navigationOptions: {
            header: null,
        },
    });

export default AccountStack;