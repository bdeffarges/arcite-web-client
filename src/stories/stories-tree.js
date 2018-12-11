import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import decorator from './decorator';
import { TreeView } from '../components/treeview/treeview';

const data = [
  {
    id: '1',
    name: 'Test',
  },
  {
    id: '2',
    name: 'Test 2',
    parentId: '1',
  },
  {
    id: '3',
    name: 'Test 3',
    parentId: '1',
  },
];

export default () => {
  storiesOf('TreeView', module)
  .addDecorator(decorator)
  .add('default appearance', () => (
    <div>
      <TreeView
        data={data}
        resolveId={d => d.id}
        resolveParentId={d => d.parentId}
        onNodeSelect={action('nodeSelect')}
      />
    </div>
  ));
};
