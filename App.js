import { StyleSheet, View } from 'react-native';
import React from 'react';
import Status from './components/Status';
import MessageList from './components/MessageList'
import { createTextMessage, createImageMessage, createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  
  renderMessageList() {
    let mList = this.createMessageList()
    let iList = [createImageMessage("https://pbs.twimg.com/media/Ehe-7nlU4AIqhUU.jpg")]
    let lList = [createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324
    })]
    return (
      <View style={styles.content}>
        <MessageList messages={mList}/>
        <MessageList messages={iList}/>
        <MessageList messages={lList}/>
      </View>);
  }

  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>);
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}></View>);
  }

  createMessageList(){
    let message = ['Hello', 'World']
    let mList = []
    for(let i = 0; i < message.length; i++){
      mList.push(createTextMessage(message[i]))
    }
    return mList
  }

  render() {
    return (
      <View style={styles.container}> 
      <Status />
      {this.renderMessageList()} 
      {/* {this.renderToolbar()} 
      {this.renderInputMethodEditor()} */} 
      {/* ตรงส่วนนี้ปิดไว้เพราะยังไม่ได้ใช้งานในสัปดาห์นี้ และทำให้หน้าจอแสดงผลได้ไม่สวยงามครับ */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)', backgroundColor: 'white',
  },
})
