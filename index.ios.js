/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



import List from './app/creation/creation';
import Edit from './app/edit/edit';
import Account from  './app/account/account';

export default class dogTalk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'list'
        };
    }


    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="rgba(77,208,225 ,1)"
                barTintColor="#fff">
                <Icon.TabBarItem
                    iconName='ios-videocam-outline'
                    selectedIconName='ios-videocam'
                    selected={this.state.selectedTab === 'list'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'list'
                        });
                      }}>
                    <Navigator
                        initialRoute={{
                            name: 'list',
                            component: List
                        }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FloatFromRight
                        }}
                        renderScene={(route,navigator) => {
                            let ComponentX = route.component;
                            return <ComponentX {...route.params} navigator={navigator} />
                        }}
                        />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName='ios-recording-outline'
                    selectedIconName='ios-recording'
                    selected={this.state.selectedTab === 'edit'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'edit'
                        });
                      }}>
                    <Edit></Edit>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName='ios-more-outline'
                    selectedIconName='ios-more'
                    selected={this.state.selectedTab === 'account'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'account'
                        });
                      }}>
                    <Account></Account>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('dogTalk', () => dogTalk);
