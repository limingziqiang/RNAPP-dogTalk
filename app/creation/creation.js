/**
 * Created by varandrewchen on 25/02/2017.
 */
import React, {Component} from 'react';
import Request from '../common/request';
import Config  from '../common/config';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let width = Dimensions.get('window').width;

export default class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        Request
            .get((Config.api.base + Config.api.creations), {
                accessToken: 'abc'
            })
            .then(data => {
                if (data.success) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data.data)
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderRow(row) {
        return (
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image
                        source={{uri: row.thumbs}}
                        style={styles.thumb}
                    >
                        <Icon
                            name="ios-play"
                            size={28}
                            style={styles.play}
                        />
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name="ios-heart-outline"
                                size={28}
                                style={styles.up}
                            />
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon
                                name="ios-chatboxes-outline"
                                size={28}
                                style={styles.commentIcon}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: 'rgba(77,208,225 ,1)'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    thumb: {
        width: width,
        height: width * .56,
        resizeMode: 'cover'
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - .5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66'
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    up: {
        fontSize: 22,
        color: '#333'
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    }
});

