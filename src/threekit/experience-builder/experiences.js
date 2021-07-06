import threekit from '../../threekit';

const { Minimalist, Ordinal } = threekit.experiences;

export default {
  'single-product': {
    id: 'single-product',
    title: 'Single Item',
    description: 'A simple look for a simple configurator.',
    Component: Minimalist,
  },
  'single-product-stepped': {
    id: 'single-product-stepped',
    title: 'Single Item Stepped',
    description: 'A step by step configurator.',
    Component: Minimalist,
  },
  'single-product-interactive': {
    id: 'single-product-interactive',
    title: 'Single Item + Interactive',
    description: 'A seamless and organic 3D and UI experience.',
    Component: Minimalist,
  },
  'single-product-animated': {
    id: 'single-product-aniamted',
    title: 'Single Item + Animated',
    description: 'Minimalist animations for a minimalist configurator.',
    Component: Minimalist,
  },
  'ordinal-interactive': {
    id: 'ordinal-interactive',
    title: 'Ordinal + Interactive',
    description: 'A drag-n-drop configurator for an Ordinal Configurator',
    Component: Ordinal,
  },
};
