import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/Colors';
import { SvgXml } from 'react-native-svg';
import { CartIcon } from '../assets/assets';

const ListScreen = () => {
    const [apiData, setApiData] = useState(null);

    const APICall = async () => {
        try {
            const response = await fetch(
                'https://create.blinkapi.io/api/eSphKNzwb9EJBt6GBjKx7Q',
            );
            const json = await response.json();
            console.log("JSON", json)
            setApiData(json)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        APICall();
    }, []);

    const renderItemData = ({ item, index }: any) => {
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>{item.category}</Text>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceStyle}>{`$${item.price}`}</Text>
                        <SvgXml xml={CartIcon} />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} resizeMode='contain' style={styles.imageStyle} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                data={apiData}
                renderItem={renderItemData}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 20,
        marginTop: 30,
        flexDirection: "row",
        paddingVertical: 20,
    },
    textContainer: {
        width: Dimensions.get('screen').width - 200,
        margin: 20
    },
    titleStyle: {
        fontWeight: "600",
        fontSize: 14,
        color: Colors.TextColor
    },
    nameStyle: {
        fontWeight: "700",
        fontSize: 32,
        color: Colors.TextColor,
        marginTop: 10
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        marginTop: 20
    },
    priceStyle: {
        fontWeight: "600",
        fontSize: 18,
        color: Colors.TextColor
    },
    imageContainer: {
        position: "absolute",
        right: 0,
        top: -30
    },
    imageStyle: {
        height: 150,
        width: 150
    }
});

export default ListScreen