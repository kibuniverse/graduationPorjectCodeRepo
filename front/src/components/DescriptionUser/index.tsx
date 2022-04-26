import { Descriptions } from '@arco-design/web-react';
import * as React from 'react';
import { UserInfo } from '../../pages/meeting-list/type';

type DescriptionUserProps = { userInfo: UserInfo };

const DescriptionUser: React.FC<DescriptionUserProps> = (props) => {
  const { userInfo } = props;
  const userInfoDescribe = React.useMemo(() => {
    if (userInfo) {
      return [
        {
          label: '用户名',
          value: userInfo.username,
        },
        {
          label: '用户id',
          value: userInfo.id,
        },
        {
          label: '用户邮箱',
          value: userInfo.email,
        },
      ];
    }
    return [];
  }, [userInfo]);
  return <Descriptions column={1} data={userInfoDescribe} />;
};

export default DescriptionUser;
