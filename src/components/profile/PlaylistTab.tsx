import EmptyRecord from '@ui/EmptyRecord';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Playlist} from 'src/@types/audio';
import {useFetchPlaylist} from 'src/hooks/query';
import {
  updatePlaylistVisibility,
  updateSelectedListId,
} from 'src/store/playlistModal';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylist();
  const dispatch = useDispatch();
  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <ScrollView style={styles.container}>
      {!data?.length ? (
        <EmptyRecord title="Ơ đây chưa có playlist nào cả!" />
      ) : null}
      {data?.map(playlist => {
        return (
          <PlaylistItem
            onPress={() => handleOnListPress(playlist)}
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
