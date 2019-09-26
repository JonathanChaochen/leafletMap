import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Map from '../components/Map';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Map" />
    <Map />
  </Layout>
);

export default IndexPage;
