/* @noflow */

import { type Component } from 'react';
import packageJson from '../package.json';

const context = require.context('./implementations/', true, /index\.js$/);
const { dependencies } = packageJson;

type ComponentsType = {
  Box: Component,
  Dot: Component,
  Provider: Component,
  TextBox: Component,
  View: Component
};

type ImplementationType = {
  components: ComponentsType,
  name: string,
  version: string
};

const toImplementations = (context: Object): Array<ImplementationType> =>
  context.keys().map(path => {
    const components = context(path).default;
    const dir = path.split('/')[1];
    const name =
      dir === 'emotion' ? '@emotion/core' : dir === 'emotion-v11' ? '@emotion/react' : dir;
    const version = dependencies[name] || '';
    return { components, name, version };
  });

const toObject = (impls: Array<ImplementationType>): Object =>
  impls.reduce((acc, impl) => {
    acc[impl.name] = impl;
    return acc;
  }, {});

const map = toObject(toImplementations(context));

export default map;
