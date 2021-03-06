/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

var REQUEST_URL = 'https://www.reddit.com/r/gifs/top.json?limit=50';

class Shogun extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => 
        response.json()
      )
      .then((responseData) => {
        console.log(responseData.data.children[0].data.title);
        console.log(responseData.data.children[0].data.thumbnail);
        var tableFields = responseData.data.children[0].data;
        var output = '';
        for (var property in tableFields) {
          output += property + ': ' + tableFields[property]+'; ';
        }
        console.log(output);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.children),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderLink} style={styles.listView} /> 
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading links...
        </Text>
      </View>
    );
  }

  renderLink(link, sectionID, rowID, highlightRow) {
    console.log(rowID, ":",link.data.title);
    //console.log(rowID, ":", link.data.thumbnail);
    console.log(rowID, ":", link.data.url);
    return (
      <View style={styles.container}>
        <Image
          source={{uri: link.data.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{link.data.title}</Text>
          <Image
            source={{uri: link.data.url}}
            style={styles.gif}
        />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  gif: {
    width: 100,
    height: 100,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Shogun', () => Shogun);
