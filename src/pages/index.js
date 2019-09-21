import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people. I am Chao</h1>
    <p>Welcome to my new Gatsby site.</p>
    <p>Build gatsby site with leafletJS and mapbox map styles</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/map/">Go to page map</Link>
    <Link to="/not/">Go to page not</Link>
  </Layout>
);

export default IndexPage;
