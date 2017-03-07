/**
 * Created by varandrewchen on 25/02/2017.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {renderPlaceholderOnly: true};
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
            <View style={styles.container}>
                <Text>详情页面</Text>
            </View>
        );
    }


    _renderPlaceholderView() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
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
