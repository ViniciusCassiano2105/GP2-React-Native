import React from 'react';
import { View, Text } from 'react-native';
import styles from './headerStyles';

interface HeaderProps {
    leftElement?: React.ReactNode;
    title: React.ReactNode;
    rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftElement, title, rightElement }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftElement}>{leftElement}</View>
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.rightElement}>{rightElement}</View>
        </View>
    );
};

export default Header;
