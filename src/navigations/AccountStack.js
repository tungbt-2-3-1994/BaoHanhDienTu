import { StackNavigator } from 'react-navigation';

import Account from '../screens/authorized/account/Account';
import Register from '../screens/authorized/account/Register';
import MyInfo from '../screens/authorized/account/MyInfo';

const AccountStack = StackNavigator({
    Account: {
        screen: Account
    },
    Register: {
        screen: Register
    },
    MyInfo: {
        screen: MyInfo
    },
}, {
        navigationOptions: {
            header: null,
        },
    });

export default AccountStack;