import { mount, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import App from '../pages/index';

describe('Index Page', () => {
  let wrapper: any;

  beforeEach(async done => {
    const props = await App.getInitialProps();
    wrapper = shallow(<App {...props} />);
    done();
  });

  it('App has a <h1> tag', async () => {
    await expect(wrapper.find('h1')).toHaveLength(1);
  });
});
