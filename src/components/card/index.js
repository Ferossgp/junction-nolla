import React from 'react';
import { View } from 'react-native';

const cardStyle = {
    borderRadius: 16,
    elevation: 4,
    backgroundColor: "#fff",
    padding: 16,
    margin: 4,
};

function Card(props){
    return (
        <View style={cardStyle}>
            {props.children}
        </View>
    );
} 

export default Card;