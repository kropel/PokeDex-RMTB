import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';

import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );
  // console.log(detailsSource?.stats);

  if (!detailsSource) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: detailsSource.sprites.front_default}}
        style={styles.image}
      />
      <Text>{name}</Text>
      {detailsSource.stats.map((item, index) => (
        <View key={index} style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {item.stat.name.toUpperCase()}:{item.base_stat}
          </Text>
          <AnimatedBar value={item.base_stat} />
        </View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  statsText: {
    marginRight: 4,
  },
};

export default DetailsView;
