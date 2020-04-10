import React from 'react'

import { SmileOutlined } from '@ant-design/icons'
import { notification } from 'antd'

export const USER_SERVER = '/api/user'

export const openNotification = () => {
    notification.open({
      message: 'An item has been added to cart',
      icon: <SmileOutlined style={{ color: 'green' }} />,
      style: {
          zIndex: 10000
      },
      duration: 2
    });
  };