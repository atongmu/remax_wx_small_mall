/*
 * @Author: your name
 * @Date: 2020-09-24 19:02:37
 * @LastEditTime: 2020-09-24 19:40:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wx_mall\src\app.ts
 */
import React, { useState, createContext } from 'react';
import 'anna-remax-ui/dist/anna.css'
import './assets/css/app.css'

export const TodoContext = createContext({});
const App: React.FC = (props) => {
    const [bingItems, setBingItems] = useState({
        user: null,
        searchText: ''
    });

    return (<TodoContext.Provider value={{ bingItems, setBingItems }}> { props.children} </TodoContext.Provider>)
}
export default App;
