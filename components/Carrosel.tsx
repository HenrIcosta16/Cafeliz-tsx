import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, ViewStyle, ImageStyle, TextStyle } from 'react-native';


interface CarroselProps {
  itens: { imagemUrl: string; descricao: string }[];
}

const Carrosel = ({ itens }: CarroselProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { width, height } = Dimensions.get('window');
  let scrollPosition = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      scrollPosition += width;
      if (scrollPosition >= width * itens.length) {
        scrollPosition = 0;
      }
      scrollViewRef.current?.scrollTo({ x: scrollPosition, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [itens, width]);

  type DynamicStyles = {
    largeScreen: {
      container: ViewStyle;
      image: ImageStyle;
      textContainer: ViewStyle;
      title: TextStyle;
      description: TextStyle;
    };
    smallScreen: {
      container: ViewStyle;
      image: ImageStyle;
      textContainer: ViewStyle;
      title: TextStyle;
      description: TextStyle;
    };
  };

  const dynamicStyles: DynamicStyles = {
    largeScreen: {
      container: {
        height: 900,
      },
      image: {
        height: 600,
      },
      textContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      description: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
      },
    },
    smallScreen: {
      container: {
        height: 600,
      },
      image: {
        height: 300,
      },
      textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      description: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
      },

      
    },
  };

  const currentStyle = width > 1200 ? dynamicStyles.largeScreen : dynamicStyles.smallScreen;

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={[styles.container, currentStyle.container]}
    >
      {itens.map((item, index) => (
        <View key={index} style={[styles.item, { width }]}>
          <Image source={{ uri: item.imagemUrl }} style={[styles.image, currentStyle.image]} />
          <View style={currentStyle.textContainer}>
            <Text style={currentStyle.description}>{item.descricao}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default Carrosel;
