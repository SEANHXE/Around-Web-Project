import React from 'react';
import '../styles/Home.css';
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;

export function Home() {
  const operations = <Button>Creat New Post</Button>;
  return (
    <Tabs tabBarExtraContent={operations} className="main-tabs">
      <TabPane tab="Images Posts" key="1">
        Content of tab 1
      </TabPane>
      <TabPane tab="Video Posts" key="2">
        Content of tab 2
      </TabPane>
      <TabPane tab="Maps" key="3">
        Content of tab 3
      </TabPane>
    </Tabs>
  );
};



