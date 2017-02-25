/**
 * Created by varandrewchen on 25/02/2017.
 */
import React, {Component} from 'react';
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
            dataSource: ds.cloneWithRows([
                {
                    "_id": "150000199410235210",
                    "thumbs": "http://dummyimage.com/1280x720/669536)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
                ,
                {
                    "_id": "820000201211200285",
                    "thumbs": "http://dummyimage.com/1280x720/39055a)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
                ,
                {
                    "_id": "540000200108253360",
                    "thumbs": "http://dummyimage.com/1280x720/bdf2f0)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
                ,
                {
                    "_id": "530000200703287600",
                    "thumbs": "http://dummyimage.com/1280x720/e5b4e0)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
                ,
                {
                    "_id": "410000200808075973",
                    "thumbs": "http://dummyimage.com/1280x720/d88221)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
                ,
                {
                    "_id": "620000197812236375",
                    "thumbs": "http://dummyimage.com/1280x720/f77c7e)",
                    "title": "测试内容m605",
                    "video": "blob:http://coding.imooc.com/cef13b94-d932-429f-b6b4-f4a34edd08ae"
                }
            ])
        };
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
                    automaticallyAdjustContentInsets={false}
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

