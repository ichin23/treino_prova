import 'react-native-gesture-handler/jestSetup';

// Mock Supabase environment variables for Jest
process.env.EXPO_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'dummy-key';

// Mock expo-video
jest.mock('expo-video', () => ({
  VideoView: 'VideoView',
  useVideoPlayer: () => ({
    play: jest.fn(),
    pause: jest.fn(),
    replace: jest.fn(),
    seek: jest.fn(),
    get volume() { return 1.0; },
    set volume(v) {},
    get isMuted() { return false; },
    set isMuted(m) {},
    playing: false,
  }),
}));
