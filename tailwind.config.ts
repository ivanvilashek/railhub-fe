import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '7.5': '1.875rem',
      },
    },
    colors: {
      // Green | Success color tokens
      green: {
        1: '#F6FEF9',
        2: '#ECFDF3',
        3: '#D1FADF',
        4: '#A6F4C5',
        5: '#6CE9A6',
        6: '#32D583',
        7: '#12B76A',
        8: '#039855',
        9: '#027948',
        10: '#05603A',
        11: '#054F31',
      },

      // Red | Error color tokens
      red: {
        1: '#FFFBFA',
        2: '#FEF3F2',
        3: '#FEE4E2',
        4: '#FECDC9',
        5: '#FDA19B',
        6: '#F97066',
        7: '#F04438',
        8: '#D92D20',
        9: '#B32318',
        10: '#912018',
        11: '#7A271A',
      },

      // Yellow | Pending color tokens
      yellow: {
        1: '#FFFCF5',
        2: '#FFFAEB',
        3: '#FEEFC6',
        4: '#FEDF89',
        5: '#FEC84B',
        6: '#FDB022',
        7: '#F79009',
        8: '#DC6803',
        9: '#B54708',
        10: '#93370D',
        11: '#792E0D',
      },

      // Blue | Alert color tokens
      blue: {
        1: '#F5FAFF',
        2: '#EFF8FF',
        3: '#D1E9FF',
        4: '#B2DDFF',
        5: '#84CAFF',
        6: '#53B1FD',
        7: '#2E90FA',
        8: '#1570EF',
        9: '#175CD3',
        10: '#1849A9',
        11: '#194185',
      },

      // Purple color tokens
      purple: {
        1: '#EFF2FF',
        2: '#C8BEFE',
        3: '#AB9DFD',
        4: '#9484FB',
        5: '#7B61FF',
        6: '#6F5CFA',
        7: '#5343D7',
        8: '#3B2EB3',
        9: '#261D90',
        10: '#181177',
      },

      //Gray color tokens
      gray: {
        1: '#FAFAFC',
        2: '#F3F4F5',
        3: '#D1D8E4',
        4: '#8F97A5',
        5: '#737B89',
        6: '#5E6675',
        7: '#4C5462',
        8: '#3C434E',
        9: '#2F353D',
        10: '#22272E',
        11: '#1D2939',
      },

      stroke: {
        1: '#E2E0EB',
        2: '#F1F3F5',
      },
      primary: '#7B61FF',
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
export default config
