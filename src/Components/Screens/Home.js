import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 200;

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    const url = `https://itunes.apple.com/in/rss/topalbums/genre=${page}/limit=${limit}/json`;
    axios.get(url)
      .then((response) => {
        const data = response.data.feed.entry;
        const uniqueAlbums = new Set([...albums, ...data]);
        setAlbums(Array.from(uniqueAlbums));
        setPage(page + 1);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={{alignItems:'center', justifyContent:'center'}}>
      <Image
    source={{ uri: item['im:image'][0].label }}
    style={{ width: 100, height: 100 }}
  />
      <Text style={{padding:10, fontWeight:'bold'}}>{item['im:name'].label}</Text>
    </View>
  );

  const handleLoadMore = () => {
    fetchAlbums();
  };

  return (
    <View>
      <FlatList
        data={albums}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.label}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Home;
