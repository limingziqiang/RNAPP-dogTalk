/**
 * Created by varandrewchen on 25/02/2017.
 */
import React, {Component} from 'react';
import Request from '../common/request';
import Config  from '../common/config';
import Detail from './detail';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    AlertIOS,
    AppRegistry
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



let width = Dimensions.get('window').width;
let cacheResults = {
    nextPage: 1,
    items: [],
    total: 0
};


export default class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoadingTail: false,
            isRefreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this._fetchData(1);
    }


    _fetchData(page) {
        page === 0
            ? this.setState({
                isRefreshing: true
            })
            : this.setState({
                isLoadingTail: true
            });

        Request
            .get((Config.api.base + Config.api.creations), {
                accessToken: 'abc',
                page: page
            })
            .then(data => {
                if (data.success) {
                    let items = cacheResults.items.slice();
                    page === 0
                        ? (items = data.data.concat(items))
                        : (items = items.concat(data.data)) && (++cacheResults.nextPage);
                    cacheResults.items = items;
                    cacheResults.total = data.total;
                    setTimeout(() => {
                        page === 0
                            ? this.setState({
                                isRefreshing: false,
                                dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
                            })
                            : this.setState({
                                isLoadingTail: false,
                                dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
                            });
                    }, 1000)
                }
            })
            .catch(error => {
                page === 0
                    ? this.setState({
                        isRefreshing: false
                    })
                    : this.setState({
                        isLoadingTail: false
                    });
                console.log(error);
            });
    }

    _hasMore() {
        return cacheResults.items.length !== cacheResults.total;
    }

    _fetchMoreData() {
        if (!this._hasMore() || this.state.isLoadingTail) {
            return;
        }
        let page = cacheResults.nextPage;
        this._fetchData(page);
    }

    _onRefresh() {
        if (!this._hasMore() || this.state.isRefreshing) return;
        this._fetchData(0);
    }

    _renderRow(row) {
        return (<Item key={row._id} onSelect={() => this._loadPage(row)} row={row}/>);
    }

    _renderFooter() {
        if (!this._hasMore() && cacheResults.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了～</Text>
                </View>
            )
        }
        if (!this.state.isLoadingTail) {
            return (<View style={styles.loadingMore}/>)
        }
        return (
            <ActivityIndicator style={styles.loadingMore}/>
        );
    }

    _loadPage() {
        this.props.navigator.push({
            name: 'detail',
            component: Detail
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this._fetchMoreData.bind(this)}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff6600"
                        title="拼命加载中..."
                      />
                    }
                />
            </View>
        )
    }
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            up: props.row.voted
        }
    }

    _like() {
        let up = !this.state.up,
            row = this.state.row,
            url = Config.api.base + Config.api.up,
            body = {
                id: row._id,
                up: up ? 'yes' : 'no',
                accessToken: 'abc'
            };
        Request.post(url, body)
            .then((data) => {
                data && data.success
                    ? this.setState({
                        up: up
                    })
                    : AlertIOS.alert('点赞失败，请稍后重试');
            })
            .catch((err) => {
                AlertIOS.alert('点赞失败，请稍后重试');
                console.log(err);
            })
    }

    render() {
        return ( <TouchableHighlight onPress={this.props.onSelect}>
            <View style={styles.item}>
                <Text style={styles.title}>{this.props.row.title}</Text>
                <Image
                    source={{uri: this.props.row.thumbs}}
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
                            name={this.state.up ? "ios-heart" : "ios-heart-outline"}
                            size={28}
                            style={[styles.up,this.state.up ? null : styles.down]}
                            onPress={this._like.bind(this)}
                        />
                        <Text style={styles.handleText} onPress={this._like.bind(this)}>喜欢</Text>
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
        </TouchableHighlight>)
    }
}

// total-waste-time = 12 hours
AppRegistry.registerComponent('List', () => List);

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
        color: 'rgb(240,20,20)'
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    down: {
        fontSize: 22,
        color: '#333'
    },
    up: {
        fontSize: 22,
        color: 'rgb(240,20,20)'
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    },
    loadingMore: {
        marginVertical: 20
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
    list: {
        overflow:'hidden'
    }

});

