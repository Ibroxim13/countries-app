import React from 'react'
import Header from './Header'
import { Layout } from 'antd';
import Main from './Main'
import Pages from './Pages';

export default function Container() {
    return (
        <Layout>
            <Header />
            <Pages />
        </Layout>
    )
}
